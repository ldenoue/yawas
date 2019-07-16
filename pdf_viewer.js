'use strict';

const PDFJS = pdfjsLib;
var signedin = false;
var highlightswrapper = document.querySelector('#yawas_highlightswrapper');

var receivedAnnotations = false;
var remapLater = [];
var yawas_annotations = [];
//var lastMousePosition = [0,0];
//var lastPageNumber = -1;
var currentHighlight = 0;

var totalPages = 0;
var hoverElement = null;
var lastHighlight = null;
var googleColors = [];
var currentColor = 'transparent';
var forecolor = 'transparent';
var hoverColor = 'lightgray';

googleColors['yellow'] = 'yellow';
googleColors['blue'] = '#0df';//'lightblue';
googleColors['red'] = '#ff9999';
googleColors['green'] = '#99ff99';
googleColors['white'] = 'transparent';
googleColors['transparent'] = 'transparent';

var PDF_URL = decodeURIComponent(location.href.split('?file=')[1]);

var pdfDocument = void 0;
var PAGE_HEIGHT = void 0;
var DEFAULT_SCALE = 1.5;//1.33;
var IOS_SCALE = DEFAULT_SCALE;

function transform(m1, m2) {
  return [
    m1[0] * m2[0] + m1[2] * m2[1],
    m1[1] * m2[0] + m1[3] * m2[1],
    m1[0] * m2[2] + m1[2] * m2[3],
    m1[1] * m2[2] + m1[3] * m2[3],
    m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
    m1[1] * m2[4] + m1[3] * m2[5] + m1[5]
  ];
}

function processTextItems(textContent,pagew,pageh)
{
    var viewportTransform = textContent.viewportTransform;
    var styles = textContent.styles;
    var items = textContent.items;
    //var top = null;
    var prevItem = null;
    var newItems = [];
    for (var i=0;i<items.length;i++)
    {
      var item = items[i];
      if (!item)
      {
        items[i] = null;
        continue;
      }
      item.str = item.str.replace(/\s+/g,' ');
      if (item.transform)
      {
          var tx = transform(viewportTransform, item.transform);
          var angle = Math.atan2(tx[1], tx[0]);
          var style = styles[item.fontName];
          var fontHeight = Math.sqrt((tx[2] * tx[2]) + (tx[3] * tx[3]));
          var fontAscent = fontHeight;
          if (!style.ascent)
          {
            if (style.fontFamily === 'serif')
              style.ascent = 0.891; // serif
            else
              style.ascent = 0.905; // sans-serif
          }
          if (!style.descent)
          {
            if (style.fontFamily === 'serif')
              style.descent = -0.216; // serif
            else
              style.descent = -0.211; // sans-serif
          }
          // Laurent: this was causing problems to htime.pdf and htime2.pdf
          style.ascent = Math.max(0.891,style.ascent);
          style.descent = Math.max(-0.211,style.descent);
          item.height = fontAscent * (style.ascent - style.descent);
          item.vertical = Math.abs(angle) > 0.002;
          if (angle === 0) {
            item.left = tx[4];
            item.top = tx[5] - fontAscent * style.ascent;
          }
          else
          {
            item.left = tx[4] + (fontAscent * Math.sin(angle));
            item.top = tx[5] - (fontAscent * Math.cos(angle));
            //console.log('vert?');
            item.top = item.top - item.width;
            var tmp = item.height;
            item.height = item.width;
            item.width = tmp;
            // case when text is vertical 1.57 radians e.g. https://docushow.com/varona2016.pdf
            if (angle > 0)
            {
              item.left = tx[4] - 4;
              item.width += 4;
              item.top = tx[5];
            }
          }
      }
      else
      {
          //DO NOTHING
      }
      item.left /= IOS_SCALE;
      item.top /= IOS_SCALE;
      item.width /= IOS_SCALE;
      item.height /= IOS_SCALE;
      item.left |= 0;
      item.top |= 0;
      item.width |= 0;
      item.lineheight = item.height;
      item.height |= 0;
    }
    
    for (var i=0;i<items.length;i++)
    {
      var item = items[i];
      if (!item)
        continue;
      const maxSpace = 100;
      const minSpace = 3;
      const topDifference = 4;
      if (prevItem !== null && Math.abs(item.top - prevItem.top) <= topDifference && (item.left > (prevItem.left + prevItem.width) - minSpace && (item.left - (prevItem.left + prevItem.width)) < maxSpace))
      {
        if (item.left - (prevItem.left + prevItem.width) > 4)
        {
          //console.log('added space first');
          prevItem.str += ' ';
        }
        prevItem.str += item.str;
        prevItem.width = item.width + item.left - prevItem.left;
        prevItem.lineheight = Math.max(prevItem.lineheight,item.lineheight);
        //if (item.hidevertical)
        //    prevItem.hidevertical = true;
      }
      else
      {
        if (prevItem !== null)
        {
          prevItem.str = prevItem.str.trim();
          newItems.push(prevItem);
        }
        prevItem = item;
      }
      //console.log(item);
    }
    if (prevItem)
      newItems.push(prevItem);

    textContent.items = newItems;
}

function yawas_signin()
{
    var width = 400;
    var height = 360;
    var left = Math.floor( (screen.width - width) / 2);
    var top = Math.floor( (screen.height - height) / 2);
    window.open('https://www.google.com/accounts/ServiceLogin?service=toolbar&nui=1&hl=en&continue=http%3A%2F%2Ftoolbar.google.com%2Fcommand%3Fclose_browser','bkmk_popup','left='+left+',top='+top+',height='+height+'px,width='+width+'px,resizable=1');
}

function needSignIn()
{
  signedin = false;
  if (highlightswrapper)
  {
    highlightswrapper.textContent = 'Yawas ➜ Click to sign in';
    highlightswrapper.style.display = 'block';
  }
}

function updateHighlightCaption() {
    if (highlightswrapper)
    {
      var nhighlights = yawas_annotations.length;
      if (nhighlights > 0)
      {
        highlightswrapper.style.display = 'block';
        if (nhighlights > 1)
        {
          var current = currentHighlight + 1;
          highlightswrapper.textContent = current + '/' + nhighlights + ' highlights';
        }
        else
          highlightswrapper.textContent = nhighlights + ' highlight';
      }
      else
      {
        highlightswrapper.style.display = 'block';
        highlightswrapper.textContent = '0 highlight';
      }
    }

}

function loadingProgress(progress) {
  let percent_loaded = (progress.loaded/progress.total)*100;
  console.log('loadingProgress',percent_loaded);
  loading.textContent = 'Loading ' + percent_loaded + '%';
}

function askForAnnotations()
{
  var additionalInfo = {
      fn: 'yawas_getAnnotations',
      title: document.title,
      url: PDF_URL
    };
  sendMessage(additionalInfo, function callback(res){
    //console.log(res);
    if (res.noannotations)
    {
      signedin = true;
      receivedAnnotations = true;
    }
    if (res.annotations)
    {
      signedin = true;
      yawas_annotations = res.annotations;
      receivedAnnotations = true;
      for (let i=0;i<remapLater.length;i++)
      {
        if (document.querySelector(`.page[data-page-number="${i+1}"][data-rendered="true"]`) !== null)
        {
          yawas_remapAnnotations(yawas_annotations,remapLater[i]);
          remapLater[i] = null;
        }
      }
      updateHighlightCaption();
      remapLater = remapLater.filter(r => r !== null);
    }
  });
}

function processPDF(pdf)
{
  pdfDocument = pdf;
  loading.style.display = 'none';
  var idx = PDF_URL.indexOf('://');
  if (idx !== -1)
    PDF_URL = PDF_URL.substring(0,idx+3) + PDF_URL.substring(idx+3).replace(/\/\//gi,'/');// fixes bug in urls

  var filename = 'download.pdf';
  try {
    var url = new URL(PDF_URL);
    filename = decodeURIComponent(url.pathname.split('/').pop());
  }
  catch (e) {}
  original.innerHTML = '<a download="' + filename + '" href="' + PDF_URL + '">save</a>';

  //originalurl.innerHTML = '<a href="' + PDF_URL + '">' + PDF_URL + '</a>';

  pdfDocument.getMetadata().then(function(m){
    if (m.info && m.info.Title)
    {
      document.title = m.info.Title;
    }
    else
    {
      document.title = filename;
    }
  });

  var viewer = document.getElementById('viewer');
  //console.log(pdf.numPages);
  var getPagesLeft = pdf.numPages;
  totalPages = pdf.numPages;
  var pageCaption = 'page';
  if (totalPages>1)
    pageCaption = 'pages';
  npagesdiv.textContent = getPagesLeft + ' ' + pageCaption;
  for (var i = 0; i < pdf.numPages; i++) {
    createEmptyPage(i + 1,function(error,page){
    });
  }

  loadPage(1).then(function (pdfPage) {
    /*var viewport = pdfPage.getViewport(DEFAULT_SCALE);
    PAGE_HEIGHT = viewport.height;
    document.body.style.width = viewport.width + 'px';*/
  });
}

if (PDF_URL.indexOf('file:') === 0)
{
  let request = new XMLHttpRequest();
  request.open('GET', PDF_URL, true);
  request.responseType = 'blob';
  request.onload = function() {
    let reader = new FileReader();
    reader.readAsArrayBuffer(request.response);
    reader.onload =  function(e){
      let typedarray = new Uint8Array(this.result);
      //Step 5:PDFJS should be able to read this
      PDFJS.getDocument(typedarray).then(processPDF);
    };
  };
  request.send();
}
else
{
  let loadingTask = PDFJS.getDocument(PDF_URL);
  loadingTask.onProgress = function(progress) {
    //console.log(progress);
    if (!progress.total)
      loading.textContent = 'Loading ' + parseInt(progress.loaded/1024) + 'kb';
    else
    {
      let percent = parseInt(progress.loaded / progress.total * 100);
      loading.textContent = 'Loading ' + percent + '%';
    }
  }
  loadingTask.promise.then(processPDF);
}

//PDFJS.cMapUrl = 'bcmaps/';
//PDFJS.getDocument(PDF_URL,false,null,loadingProgress).then(function (pdf) {
//  
//});

npagesdiv.addEventListener('click',function promptPage()
{
  var page = prompt('Jump to page');
  try {
    page = parseInt(page);
    if (page<1)
      page = 1;
    else if (page > totalPages)
      page = totalPages;
    var elem = document.querySelector('#pageContainer' + page);
    elem.scrollIntoView();
  }
  catch (e) {}
});

window.addEventListener('scroll', handleWindowScroll);

// TODO: optimize to make sure we only refresh for pageNum if defined
function yawas_remapAnnotations(annotations,pageNum)
{
  var pageelem = document.querySelector(`.page[data-page-number="${pageNum}"][data-rendered="true"]`);
  if (!pageelem)
  {
    console.error('yawas_remapAnnotations, pageelem not rendered',pageNum);
    return;
  }
  //console.log('yawas_remapAnnotations',annotations,pageNum,pageelem);
  var scrollLeft = window.scrollX;
  var scrollTop = window.scrollY;
  var nremapped = 0;
  for (var i=0;i<annotations.length;i++)
  {
    var ann = annotations[i];
    if (ann.p && pageNum && ann.p !== pageNum)
    {
      //console.log('not for this page',ann.selection,ann.p,pageNum);
      continue;
    }
    if (ann.p)
      pageNum = ann.p;
    else
    {
      ann.p = 1;
      pageNum = 1;
      console.error('annotation does not have a page, setting it to 1');
      //continue;
    }
    
    //console.log('remove',pageNum,ann);
    window.getSelection().removeAllRanges();
    
    var n = 0;
    var textLayer = document.querySelector('#pageContainer'+pageNum).querySelector('.textLayer');
    window.getSelection().collapse(textLayer,0);
    while (n<annotations[i].n && window.find(annotations[i].selection,true,false))
    {
        n++;
    }

    if (n==annotations[i].n && window.find(annotations[i].selection,true,false))
    {
      var rects = prepareRects(document.getSelection().getRangeAt(0).getClientRects());
      var page = document.getSelection().getRangeAt(0).startContainer.parentElement;
      while (page.className !== 'page')
        page = page.parentElement;
      if (ann.p && parseInt(page.dataset.pageNumber) !== ann.p)
      {
        console.error('not the right page for "',ann.selection,'", p=',ann.p,'page p=',page.dataset.pageNumber);
      }
      else
      {
        var canvas = page.querySelector('canvas');
        if (!canvas)
        {
          console.error('no canvas for page',page);
        }
        else
        {
          nremapped++;

          var o = canvas.getBoundingClientRect();
          for (var ii=0;ii<rects.length;ii++)
          {
            rects[ii].left -= o.left;
            rects[ii].top -= o.top;
          }
          annotations[i].rects = rects;
          var ctx = canvas.getContext('2d');
          ctx.save();
          if (!annotations[i].color)
            console.error('googleColors=',googleColors[annotations[i].color],annotations[i].color,annotations[i],i);
          ctx.fillStyle = googleColors[annotations[i].color];
          ctx.globalCompositeOperation = 'multiply';
          for (var r=0;r<rects.length;r++)
          {
            //console.log(pageNum,r,annotations[i].selection);
            var rect = rects[r];
            ctx.fillRect(rect.left,rect.top,rect.width,rect.height);
          }
          ctx.restore();
        }
      }
    }
  }
  window.getSelection().removeAllRanges();
  window.scrollTo(scrollLeft,scrollTop);
  return annotations.length;
}

function requestHandler(request, sender, sendResponse) {
  if (request.addedhighlight === true)
  {
    signedin = true;
    updateHighlightCaption();
  }
  if (request.signedin && !signedin)
  {
    //console.log('request.signedin received but we were not signedin, so asking for annotations');
    askForAnnotations();
    sendResponse({});
  }
  if (request.notsignedin)
  {
    //console.log('request.notsignedin received');
    needSignIn();
    sendResponse({});
  }
  if (request.toobig)
  {
    alert('Too many annotations. Google Bookmarks can only store 2048 characters');
    yawas_annotations.pop();
    redrawPage(lastPageNumber);
  }
  else if (request.action)
  {
    if (request.action === 'yawas_next_highlight')
      yawas_next_highlight();
    else if (request.action === 'yawas_chrome')
    {
      document.body.yawasMainURL= encodeURIComponent(request.url);
      yawas_chrome(request.color);
    }
    else if (request.action === 'yawas_delete_highlight')
      yawas_chrome('delete');
    else if (request.action === 'yawas_chrome_search')
      yawas_chrome_search();
    else if (request.action === 'yawas_chrome_edit')
      yawas_chrome_edit();
    else if (request.action === 'yawas_undohighlight_because_not_signed_in')
    {
      console.error('TODO: undo highlight received');
      //yawas_undohighlight_because_not_signed_in();
    }
  }
  else if (request.undohighlight)
  {
    console.error('TODO: undo highlight received');
    //yawas_undohighlight_because_not_signed_in();
  }
  sendResponse({});
  return true;
}

chrome.runtime.onMessage.addListener(requestHandler);

function rectOverlap(x,y,rects) {
  for (var i=0;i<rects.length;i++)
  {
    var r = rects[i];
    //console.log(x,y,r);
    if (x >= r.left && x<r.left+r.width && y>=r.top && y<r.top+r.height)
      return i;
  }
  return -1;
}
  
var SimpleLinkService = (function SimpleLinkServiceClosure() {
  function SimpleLinkService(pdfViewer) {
    this.pdfViewer = pdfViewer;
  }
  SimpleLinkService.prototype = {
    /**
     * @returns {number}
     */
    get page() {
      return this.pdfViewer.currentPageNumber;
    },
    /**
     * @param {number} value
     */
    set page(value) {
      this.pdfViewer.currentPageNumber = value;
    },
    /**
     * @param dest - The PDF destination object.
     */
    navigateTo: function (dest) {
      //console.log(dest);
    },
    /**
     * @param dest - The PDF destination object.
     * @returns {string} The hyperlink to the PDF object.
     */
    getDestinationHash: function (dest) {
      return '#';
    },
    /**
     * @param hash - The PDF parameters/hash.
     * @returns {string} The hyperlink to the PDF object.
     */
    getAnchorUrl: function (hash) {
      return '#';
    },
    /**
     * @param {string} hash
     */
    setHash: function (hash) {
      //console.log('hash=',hash);
    },
    /**
     * @param {string} action
     */
    executeNamedAction: function (action) {},
  };
  return SimpleLinkService;
})();
  var linkService = new SimpleLinkService();
	function createEmptyPage(num,callback) {
    var page = document.createElement('div');
    var canvas = document.createElement('canvas');
    var wrapper = document.createElement('div');
    var textLayer = document.createElement('div');
    var annotationLayer = document.createElement('div');
    //textLayer.addEventListener('mousemove',onMouseMove);
    //textLayer.addEventListener('mouseleave',function() {lastPageNumber=-1});

    page.className = 'page';
    wrapper.className = 'canvasWrapper';
    textLayer.className = 'textLayer';
    annotationLayer.className = 'annotationLayer';

    page.setAttribute('id', 'pageContainer' + num);
    page.setAttribute('data-loaded', 'false');
    page.setAttribute('data-page-number', num);

    canvas.setAttribute('id', 'page' + num);

    page.appendChild(wrapper);
    page.appendChild(textLayer);
    page.appendChild(annotationLayer);
    wrapper.appendChild(canvas);
    viewer.appendChild(page);

	  pdfDocument.getPage(num).then(function (pdfPage) {
	    var viewport = pdfPage.getViewport({scale:DEFAULT_SCALE});
	    if (num === 1)
	    {
        PAGE_HEIGHT = viewport.height;
	      //document.body.style.width = viewport.width + 'px';
	    }

	    canvas.width = viewport.width * 2;
	    canvas.height = viewport.height * 2;
	    page.style.width = viewport.width + 'px';
	    page.style.height = viewport.height + 'px';
	    wrapper.style.width = viewport.width + 'px';
	    wrapper.style.height = viewport.height + 'px';
	    textLayer.style.width = viewport.width + 'px';
	    textLayer.style.height = viewport.height + 'px';
  	  callback(null,page);
	  });
	}

  function redrawPage(pageNum) {
	  return pdfDocument.getPage(pageNum).then(function (pdfPage) {
	    var page = document.getElementById('pageContainer' + pageNum);
	    var canvas = page.querySelector('canvas');
	    var canvasContext = canvas.getContext('2d');
	    var viewport = pdfPage.getViewport(DEFAULT_SCALE);
      pdfPage.render({
	      canvasContext: canvasContext,
	      viewport: viewport
	    }).promise.then(function(){
  	    yawas_remapAnnotations(yawas_annotations,pageNum);
  	  }).catch(err => alert(err));
    });
  }

	function loadPage(pageNum) {
	  return pdfDocument.getPage(pageNum).then(function (pdfPage) {
	    var page = document.getElementById('pageContainer' + pageNum);
	    var canvas = page.querySelector('canvas');
	    var wrapper = page.querySelector('.canvasWrapper');
	    var container = page.querySelector('.textLayer');
	    var annotationLayer = page.querySelector('.annotationLayer');
	    var canvasContext = canvas.getContext('2d');
	    canvasContext.setTransform(1, 0, 0, 1, 0, 0);
	    var viewport = pdfPage.getViewport({scale:DEFAULT_SCALE});

	    canvas.width = viewport.width * 2;
	    canvas.height = viewport.height * 2;
	    page.style.width = viewport.width + 'px';
	    page.style.height = viewport.height + 'px';
	    wrapper.style.width = viewport.width + 'px';
	    wrapper.style.height = viewport.height + 'px';
	    container.style.width = viewport.width + 'px';
	    container.style.height = viewport.height + 'px';

	    pdfPage.render({
	      canvasContext: canvasContext,
	      viewport: viewport
	    }).promise.then(function(){
        pdfPage.getTextContent({ normalizeWhitespace: true }).then(function (textContent) {
          textContent.viewportTransform = viewport.transform;
          processTextItems(textContent,canvas.width,canvas.height);
          //console.log(textContent);
          PDFJS.renderTextLayer({
            textContent: textContent,
            container: container,
            viewport: viewport,
            textDivs: [],
            //enhanceTextSelection: true,
            
          }).promise.then(() => {
            page.setAttribute('data-rendered', 'true');
            setTimeout(function (){
              if (pageNum === 1)
                askForAnnotations();
              if (receivedAnnotations)
                yawas_remapAnnotations(yawas_annotations,pageNum);
              else
              {
                remapLater.push(pageNum);
              }
            },200);
          }).catch(err => alert(err));
        });
      }).catch(err => alert(err));
	    page.setAttribute('data-loaded', 'true');

	    return pdfPage;
	  });
	}

  var loadingPages = {};
	function handleWindowScroll() {
	  var visiblePageNum = Math.round(window.scrollY / PAGE_HEIGHT) + 1;
	  if (loadingPages[visiblePageNum])
	  {
	    //console.log('already loading page',visiblePageNum);
	    return;
	  }
	  loadingPages[visiblePageNum] = true;
	  var visiblePage = document.querySelector('.page[data-page-number="' + visiblePageNum + '"][data-loaded="false"]');
	  if (visiblePage) {
	    //npagesdiv.textContent = visiblePageNum + '/' + totalPages;
	    setTimeout(function () {
	      //console.log('load page',visiblePageNum);
	      loadPage(visiblePageNum);
	    });
	  }
	}

  function yawas_tryHighlight(pagenumber)
  {
      var wnd = window;
      var nselections = wnd.getSelection().rangeCount;
      if (nselections==0)
          return null;
      var selection = wnd.getSelection().getRangeAt(0);
      var selectionstring = wnd.getSelection()+"";//selection.toString();
      selectionstring = selectionstring.trim();
      if (selectionstring.length == 0)
          return null;
      if (selectionstring.indexOf("\n")>=0)
      {
          alert("Please select text without new lines");
          return null;
      }
      var docurl = PDF_URL;
      var occurence = -1;
      wnd.getSelection().removeAllRanges();
      var textLayer = document.querySelector('#pageContainer'+pagenumber).querySelector('.textLayer');
      window.getSelection().collapse(textLayer,0);

      var found = false;
      while (!found && wnd.find(selectionstring,true,false))
      {
          occurence += 1;
          var rng = wnd.getSelection().getRangeAt(0);
          /*var page = rng.startContainer.parentElement.parentElement.parentElement;
          var thispageNumber = +page.dataset.pageNumber;
          if (thispageNumber !== pagenumber)
          {
            console.log('not same page, resetting occurence');
            occurence = -1;
          }*/
          if (selection.compareBoundaryPoints(Range.END_TO_START, rng) == -1 && selection.compareBoundaryPoints(Range.START_TO_END, rng) == 1)
          {
            found = true;
          }
      }
      if (!found)
          occurence = -1;
      if (occurence >= 0)
      {
        //console.log('occurence=',occurence);
        var rects = prepareRects(document.getSelection().getRangeAt(0).getClientRects());
        //lastHighlight = highlightNowFirefox22(window.getSelection().getRangeAt(0),currentColor,forecolor,window.document,selectionstring,occurence);
        wnd.getSelection().removeAllRanges();
        return {rects:rects,selection:selectionstring,n:occurence};
      }
      else
      {
          alert('Sorry, [' + selectionstring + '] was not found.');
          wnd.getSelection().removeAllRanges();
          return null;
      }
  }

  function prepareRects(rects)
  {
    var res = [];
    for (var i=0;i<rects.length;i++)
    {
      var r = rects[i];
      res.push({left:r.left,top:r.top,width:r.width,height:r.height});
    }
    return res;
  }

  function highlightSelection(color,page)
  {
    var pagenumber = +page.dataset.pageNumber;
    var canvas = page.querySelector('canvas');
    var o = canvas.getBoundingClientRect();
    var ctx = canvas.getContext('2d');

    var res = yawas_tryHighlight(pagenumber);
    if (!res)
    {
      return;
    }
    var rects = res.rects;
    var selectionString = res.selection;
    for (var i=0;i<rects.length;i++)
    {
      rects[i].left -= o.left;
      rects[i].top -= o.top;
    }
    var obj = {color:color,selection:selectionString,p:pagenumber,n:res.n,rects:rects};
    //console.log('new annotation',obj);
    yawas_annotations.push(obj);
    ctx.save();
    ctx.fillStyle = googleColors[color];
    ctx.globalCompositeOperation = 'multiply';
    for (var i=0;i<rects.length;i++)
    {
      var rect = rects[i];
      ctx.fillRect(rect.left/*-o.left*/,rect.top/*-o.top*/,rect.width,rect.height);
    }
    ctx.restore();
    //var selectionString = document.getSelection().getRangeAt(0).toString();
    //document.getSelection().getRangeAt(0).collapse();

    var additionalInfo = {
        fn: 'addhighlightpdf',
        title: document.title,
        url: PDF_URL,
        selection: selectionString,
        occurence: res.n,
        p:pagenumber,
        couleur: color
    };
    sendMessage(additionalInfo, function (res)
    {
      if (res.addedhighlight)
      {
        sendMessage({fn: "yawas_toolbar_signed_in"});
        updateHighlightCaption();
      }
      if (res.undohighlight)
      {
        //yawas_undohighlight_because_not_signed_in();
        console.error('undohighlight',res);
      }
      //console.log(res);
    });
  }


function sendMessage(info,cb)
{
  try {
    chrome.runtime.sendMessage(info, function response(res) {
      if (cb)
        cb(res);
      //else
      //  console.log('sendMessage',info,res);
    });
  } catch(e)
  {
    if (cb)
      cb({error:e});
    else
      console.error('sendMessage error' + e);
  }
}


function highlightNowFirefox22(elt,color,textcolor,doc, selectionstring,occurence)
{
    //alert('now');
    var body = doc.body;
    if (!body)
    {
        return null;
    }
    
    var baseNode = doc.createElement("span");//not 'font' because 'font' changes the style
    //baseNode.setAttribute("style", "background-color: " + googleColors[color] +";");
    baseNode.style.color=textcolor;
    //addShadows22(baseNode);
    baseNode.setAttribute("name", "ahb-span");
    baseNode.setAttribute("value", selectionstring);
    
    baseNode.className = 'yawas-highlight';
    var nodeSurround = baseNode.cloneNode(true);
    nodeSurround.yawasOccurence = occurence;
    nodeSurround.yawasColor = googleColors[color];
    nodeSurround.yawasSelection = selectionstring;
    //alert(nodeSurround);
    var node = yawas_highlight222(elt, nodeSurround);
    return node;
}

function yawas_highlight222(range, node)
{
    //alert(range.startContainer);
    var startContainer = range.startContainer;
    var startOffset = range.startOffset;
    var endOffset = range.endOffset;
    var docfrag = range.extractContents();
    var before = startContainer.splitText(startOffset);
    var parent = before.parentNode;
    node.appendChild(docfrag);
    parent.insertBefore(node, before);
    node.addEventListener('mouseover',function (e) { hoverElement = this; hoverElement.classList.add('hover'); },false);
    node.addEventListener('mouseout',function (e) { if (!hoverElement) return; hoverElement.classList.remove('hover');},false);
    return node;
}

function yawas_chrome_search()
{
    window.location = "https://www.google.com/bookmarks/?hl=en#!view=threadsmgmt&fo=Starred&q=&g=Time";
}

function yawas_chrome_edit()
{
    try {
        var url = encodeURIComponent(PDF_URL);
        var title = encodeURIComponent(document.title);
        var a = window;
        a.open("http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=" + url + "&title="  + title, "bkmk_popup", "left="+((a.screenX||a.screenLeft)+10)+",top="+((a.screenY||a.screenTop)+10)+",height=420px,width=550px,resizable=1,alwaysRaised=1");
    } catch (e) { console.error('edit error:' + e); }
}

// if no selection, error
// else
//   if yes, recolor that highlight, or delete it if color==='delete'
//   else create new highlights
function yawas_chrome(color)
{
  // if nothing is selected, error
  if (document.getSelection().rangeCount === 0)
  {
    alert('please select something to highlight, recolor, or delete it');
    return;
  }
  
  // find the page where the selection happened
  var page = document.getSelection().getRangeAt(0).startContainer.parentElement;
  while (page.className !== 'page')
    page = page.parentElement;
  var pagenumber = +page.dataset.pageNumber;

  var selRects = prepareRects(document.getSelection().getRangeAt(0).getClientRects());
  var o = page.querySelector('canvas').getBoundingClientRect();
  for (var ii=0;ii<selRects.length;ii++)
  {
    selRects[ii].left -= o.left;
    selRects[ii].top -= o.top;
  }

  var match = null;

  for (var i=0;i<yawas_annotations.length;i++)
  {
    if (!yawas_annotations[i].rects)
      continue;
    if (!yawas_annotations[i].p || yawas_annotations[i].p !== pagenumber)
      continue;
    
    for (var r=0;r<selRects.length;r++)
    {
      var x = selRects[r].left+selRects[r].width/2;
      var y = selRects[r].top+selRects[r].height/2;
      if (rectOverlap(x,y,yawas_annotations[i].rects) !== -1)
      {
        match = yawas_annotations[i];
        break;
      }
    }
    if (match)
      break;
  }
  if (match === null)
  {
    if (color !== 'delete')
      highlightSelection(color,page);
    else
      alert('Do delete a highlight, select some of it');
  }
  else
  {
    if (color === 'delete')
    {
      sendMessage({
        action: "delete_pdf_highlight",
        highlightString: match.selection,
        url: PDF_URL,
        title: document.title,
        p: match.p,
        n: match.n
      },function(response){
        if (response && response.highlights)
        {
          yawas_annotations = response.highlights;
          console.log('redraw page',pagenumber);
          redrawPage(pagenumber);
        }
      });
    }
    else
    {    
      match.color = color;
      var obj = {
        action: "recolor_pdf_highlight",
        url: PDF_URL,
        title: document.title,
        highlightString: match.selection,
        n: match.n,
        p: match.p,
        newcolor: color
      };
      sendMessage(obj);
      redrawPage(pagenumber);
    }
  }
  updateHighlightCaption();
}

function yawas_next_highlight()
{
  if (!signedin)
    return yawas_signin();

  updateHighlightCaption();
    
  if (yawas_annotations.length==0)
      return;
  currentHighlight = currentHighlight % yawas_annotations.length;
  let h = yawas_annotations[currentHighlight];
  let p = h.p;
  let page = document.querySelector('#pageContainer'+p);
  if (page)
    page.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

  currentHighlight += 1;

}

function yawas_copytoclipboard()
{
  var additionalInfo = {
    "title": document.title,
    "url": PDF_URL,
    "fn": "copytoclipboard",
  };
  sendMessage(additionalInfo);
}

function yawas_email()
{
  var additionalInfo = {
    "title": document.title,
    "url": PDF_URL,
    "fn": "emailhighlights",
  };
  sendMessage(additionalInfo);
}

function addHighlightsWrapper()
{
  if (highlightswrapper === null)
  {
    highlightswrapper = document.createElement('div');
    highlightswrapper.id = 'yawas_highlightswrapper';
    highlightswrapper.style.userSelect = 'none';
    highlightswrapper.style.display = 'block';
    highlightswrapper.style.position = 'fixed';
    highlightswrapper.style.zIndex = 200000;
    highlightswrapper.style.margin = '0px';
    highlightswrapper.style.fontFamily = '"avenir next",Helvetica';
    highlightswrapper.style.right = '8px';
    highlightswrapper.style.bottom = '8px';
    highlightswrapper.style.borderRadius = '0px';
    highlightswrapper.style.color = 'white';
    //highlightswrapper.style.boxShadow = '0 0 3px black';
    highlightswrapper.addEventListener('click',yawas_next_highlight);
    highlightswrapper.textContent = '';
    highlightswrapper.style.cursor = 'pointer';
    
    highlightswrapper.style.fontSize = '14px';
    highlightswrapper.style.fontWeight = 'bold';
    highlightswrapper.style.color = 'black';
    highlightswrapper.style.backgroundColor = '#8a8';
    highlightswrapper.style.borderRadius = '32px';
    highlightswrapper.style.padding = '8px 16px';
    highlightswrapper.textContent = '...';
    document.body.appendChild(highlightswrapper);
  }
}

document.addEventListener('keydown', function (e){
  if (e.key === 'Delete')
  {
    e.preventDefault();
    console.error('todo: delete highlight');
  }
  else if (e.ctrlKey && e.shiftKey)
  {
    e.preventDefault();
    if (e.key === 'Y')
      yawas_chrome('yellow');
    else if (e.key === 'G')
      yawas_chrome('green');
    else if (e.key === 'B')
      yawas_chrome('blue');
    else if (e.key === 'R')
      yawas_chrome('red');
    else if (e.key === 'D')
      yawas_chrome('delete');
    else if (e.keyCode == 67) // Copy to clipboard
      yawas_copytoclipboard();
    else if (e.keyCode == 69) // Email
      yawas_email();
  }
},false);

addHighlightsWrapper();

