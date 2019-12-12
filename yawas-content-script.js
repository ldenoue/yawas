var signedin = false;
var highlightswrapper = document.querySelector('#yawas_highlightswrapper');
var forecolor = "#000000";
var currentColor = "yellow";
var hoverColor = 'lightgray';//'pink'
var hoverElement = null;
var lastHighlight = null;
var leftMark = '<<';//'&ldquo;'
var rightMark = '>>';//'&rdquo;'
var lenquote = rightMark.length;//2;
var googleColors = [];
googleColors['yellow'] = 'yellow';
googleColors['blue'] = '#0df';//'lightblue';
googleColors['red'] = '#ff9999';
googleColors['green'] = '#99ff99';
googleColors['white'] = 'transparent';
var notRemapped = [];
var INSTAPAPER_PREFIX  = "http://www.instapaper.com/text?u="
var VIEWTEXT_PREFIX  = "http://viewtext.org/article?url="
var READABILITY_PREFIX  = "http://www.readability.com/m?url="

function stripMobilizer(url)
{
    var i = url.indexOf(VIEWTEXT_PREFIX);
    if (i == 0)
        return decodeURIComponent(url.substring(VIEWTEXT_PREFIX.length));
    
    i =  url.indexOf(INSTAPAPER_PREFIX);
    if (i == 0)
        return decodeURIComponent(url.substring(INSTAPAPER_PREFIX.length));
    
    i = url.indexOf(READABILITY_PREFIX);
    if (i == 0)
        return decodeURIComponent(url.substring(READABILITY_PREFIX.length));
    
    return url;
}

function setHighlightCaption(txt)
{
  if (highlightswrapper && highlightswrapper.querySelector('#highlightcaption'))
    highlightswrapper.querySelector('#highlightcaption').textContent = txt;
}

function showNotFound()
{
  if (highlightsnotfoundtext.style.display === 'none')
  {
    var html = [];
    notRemapped.forEach(highlight => html.push(highlight.selection));
    highlightsnotfoundtext.innerHTML = `<div style='text-align:left;color:white'>${html.join('<br>')}</div>`;
    highlightsnotfoundtext.style.display = 'block';
  }
  else
    highlightsnotfoundtext.style.display = 'none';
}

function setHighlightsNotFound(array)
{
  if (highlightswrapper && highlightswrapper.querySelector('#highlightsnotfound'))
  {
    if (array.length > 0)
    {
      highlightswrapper.querySelector('#highlightsnotfound').textContent = array.length + ' missing';
    }
    else
      highlightswrapper.querySelector('#highlightsnotfound').textContent = '';
  }
}

function updateHighlightCaption() {
    if (highlightswrapper)
    {
      var nbNotRemapped = notRemapped.length;
      var nhighlights = document.getElementsByClassName('yawas-highlight').length;
      if (nhighlights > 0)
      {
        highlightswrapper.style.display = 'block';
        if (nhighlights > 1)
        {
          var current = currentHighlight + 1;
          //highlightswrapper.textContent = current + '/' + nhighlights + ' highlights';
          setHighlightCaption(current + '/' + nhighlights + ' highlights');
        }
        else
        {
          //highlightswrapper.textContent = nhighlights + ' highlight';
          setHighlightCaption(nhighlights + ' highlight');
        }
        setHighlightsNotFound(notRemapped);
      }
      else
      {
        highlightswrapper.style.display = 'none';
        //highlightswrapper.style.display = 'block';
        //highlightswrapper.textContent = '0 highlight';
      }
    }

}

function purifyURL(href)
{
    if (href && href.indexOf('https://mail.google') === 0)
      return href;
    var url = stripMobilizer(href);
    var pos = url.indexOf('#');
    if (pos > 0)
        url = url.substring(0,pos);
    url = url.replace(/[?&]utm_.*/,'');
    url = url.replace(/[?&]WT\..*/,'');
    url = url.replace(/[?&]ns_.*/,'');
    url = url.replace(/[?&]rand=.*/,'');
    url = url.replace(/[?&]src=.*/,'');
    url = url.replace(/[?&]imm_mid=.*/,'');
    url = url.replace(/[?&]cmp=.*/,'');
    url = url.replace(/[?&]ncid=.*/,'');
    url = url.replace(/[?&]cps=.*/,'');
    url = url.replace(/[?&]mc_cid=.*/,'');
    url = url.replace(/[?&]mc_eid=.*/,'');
    url = url.replace(/[?&]mbid=.*/,'');
    if (url.indexOf('nytimes.com')!=-1)
        url = url.split('?')[0];
    //console.log('purifyURL=',href,'=',url);
    return url;
}

function yawas_getGoodUrl(doc)//,url)
{
    var url = null;
    //console.log('yawas_getGoodUrl',doc,doc.location,doc.location.href);
    if (doc && doc.location && doc.location.hostname.indexOf('readability.com') !== -1)
    {
        var origin = doc.querySelector('.entry-origin a');
        if (origin)
            url = origin.href;
    }
    if (!url)
        url = doc.location.href;
    
    if (url.indexOf("q=cache:") > 0)
    {
        try {
            return purifyURL(doc.getElementsByTagName('base')[0].href);
        } catch (e) {}
    }
    else
        return purifyURL(url);
}

function needSignIn()
{
  signedin = false;
  if (highlightswrapper)
  {
    //highlightswrapper.textContent = 'Yawas ➜ Click to sign in';
    highlightswrapper.textContent = 'Signed out';
    highlightswrapper.style.display = 'block';
  }
}

function askForAnnotations(delay)
{
  var url = yawas_getGoodUrl(document);
  var additionalInfo = {
    "fn": "yawas_getAnnotations",
    "title": document.title,
    "url": url
  };
  if (!delay)
    delay = 0;
  setTimeout(function () {
    sendMessage(additionalInfo, function (res) {
      if (res.error)
      {
        if (res.signedout)
        {
          needSignIn();
          if (res.url)
          {
            //window.open(res.url);
            //console.log('res.url=',res.url);
          }
        }
      }
      else if (res.noannotation)
      {
        signedin = true;
        hoverElement = null;
        updateHighlightCaption();
      }
      else if (res.annotations)
      {
        signedin = true;
        hoverElement = null;
        yawas_remapAnnotations(res.annotations);
        updateHighlightCaption();
      }
    });
  }, delay);
}

function yawas_signin()
{
    var width = 400;
    var height = 360;
    var left = Math.floor( (screen.width - width) / 2);
    var top = Math.floor( (screen.height - height) / 2);
    window.open('https://www.google.com/accounts/ServiceLogin?service=toolbar&nui=1&hl=en&continue=http%3A%2F%2Ftoolbar.google.com%2Fcommand%3Fclose_browser','bkmk_popup','left='+left+',top='+top+',height='+height+'px,width='+width+'px,resizable=1');
}

function requestCallback(request, sender, sendResponse) {
  if (request.action)
  {
    if (request.action === 'signedin')
    {
      if (!signedin)
      {
        signedin = true; // this avoids loops: we declare we're signed first
        if (highlightswrapper)
        {
          highlightswrapper.textContent = 'Yawas ➜ Refresh to view annotations';
          highlightswrapper.style.display = 'block';
        }
      }
    }
    else if (request.action === 'yawas_next_highlight')
      yawas_next_highlight();
    else if (request.action === 'yawas_chrome')
      yawas_chrome(request.color);
    else if (request.action === 'yawas_delete_highlight')
      yawas_delete_highlight();
    //else if (request.action === 'yawas_chrome_search')
    //  yawas_chrome_search();
    //else if (request.action === 'yawas_chrome_edit')
    //  yawas_chrome_edit();
  }
  sendResponse({ok:true});
  return true; // important in case we need sendResponse asynchronously
}

chrome.runtime.onMessage.addListener(requestCallback);

function isSavingLocally(cb)
{
  chrome.storage.sync.get({saveLocally: false}, function(items) {
    if (items && items.saveLocally === true)
      cb(true);
    else
      cb(false);
  });
}

function yawas_undohighlight()
{
  if (lastHighlight !== null)
  {
    var f = document.createDocumentFragment();
    while(lastHighlight.firstChild)
      f.appendChild(lastHighlight.firstChild);
    lastHighlight.parentNode.replaceChild(f,lastHighlight);
    lastHighlight = null;
  }
}

function addHighlightsWrapper()
{
  if (highlightswrapper === null)
  {
    highlightswrapper = document.createElement('div');
    highlightswrapper.id = 'yawas_highlightswrapper';
    highlightswrapper.style.userSelect = 'none';
    highlightswrapper.style.display = 'none';
    highlightswrapper.style.position = 'fixed';
    highlightswrapper.style.zIndex = 200000;
    highlightswrapper.style.margin = '0px';
    highlightswrapper.style.fontFamily = '"avenir next",Helvetica';
    highlightswrapper.style.right = '8px';
    highlightswrapper.style.bottom = '8px';
    highlightswrapper.style.borderRadius = '0px';
    highlightswrapper.style.color = 'white';
    //highlightswrapper.style.boxShadow = '0 0 3px black';
    //highlightswrapper.addEventListener('click',yawas_next_highlight);
    highlightswrapper.textContent = '';
    highlightswrapper.style.textAlign = 'center';
    //highlightswrapper.style.cursor = 'pointer';
    
    highlightswrapper.style.fontSize = '14px';
    highlightswrapper.style.fontWeight = 'bold';
    highlightswrapper.style.color = 'black';
    highlightswrapper.style.backgroundColor = '#8a8';
    highlightswrapper.style.borderRadius = '32px';
    highlightswrapper.style.padding = '8px 16px';
    //highlightswrapper.textContent = '';
    
    var highlightcaption = document.createElement('div');
    highlightcaption.addEventListener('click',yawas_next_highlight);
    highlightcaption.title = 'Click to navigate in highlights';
    highlightcaption.id = 'highlightcaption';
    highlightcaption.style.cursor = 'pointer';
    highlightcaption.textContent = '';
    highlightswrapper.appendChild(highlightcaption);
    
    var highlightsnotfound = document.createElement('div');
    highlightsnotfound.style.color = '#a22';
    highlightsnotfound.style.cursor = 'pointer';
    highlightsnotfound.addEventListener('click',showNotFound);
    highlightsnotfound.title = 'Click to show missing highlights';
    highlightsnotfound.id = 'highlightsnotfound';
    highlightswrapper.appendChild(highlightsnotfound);

    var highlightsnotfoundtext = document.createElement('div');
    highlightsnotfoundtext.style.color = '#a22';
    highlightsnotfoundtext.style.display = 'none';
    highlightsnotfoundtext.id = 'highlightsnotfoundtext';
    highlightswrapper.appendChild(highlightsnotfoundtext);
    
    document.body.appendChild(highlightswrapper);
  }
}

function yawas_storeHighlight(webUrl,title,highlight,occurence,couleur,addcommentwhendone)
{
    var additionalInfo = {
        "fn": "addhighlight",
        "title": title,
        "url": webUrl,
        "selection": highlight,
        "occurence": occurence,
        "couleur": couleur
    };
    sendMessage(additionalInfo, function (res)
    {
      if (res.addedhighlight)
      {
        signedin = true;
        updateHighlightCaption();
        if (addcommentwhendone)
        {
          hoverElement = lastHighlight;
          recolor('note');
        }
      }
      if (res.undohighlight || res.error)
      {
        if (res.signedout)
          alert('Yawas cannot store your highlight because you are signed out.\nPlease signin first and then refresh this page');
        yawas_undohighlight();
      }
    });
}

function yawas_tryHighlight(wnd,addcommentwhendone)
{
    if (!wnd)
      return false;
    var nselections = wnd.getSelection().rangeCount;
    if (nselections === 0)
        return false;
    var selection = wnd.getSelection().getRangeAt(0);
    var selectionstring = wnd.getSelection()+"";//selection.toString();
    selectionstring = selectionstring.trim();
    if (selectionstring.length === 0)
        return false;
    if (selectionstring.indexOf("\n") >= 0)
    {
        alert("Please select text without new lines");
        return false;
    }
    var docurl = yawas_getGoodUrl(wnd.document);
    var occurence = -1;
    wnd.getSelection().removeAllRanges();
    var found = false;
    while (!found && wnd.find(selectionstring,true,false))
    {
        occurence += 1;
        var rng = wnd.getSelection().getRangeAt(0);
        if (selection.compareBoundaryPoints(Range.END_TO_START, rng) == -1 && selection.compareBoundaryPoints(Range.START_TO_END, rng) == 1)
            found = true;
    }
    if (!found)
        occurence = -1;
    if (occurence >= 0)
    {
        lastHighlight = highlightNowFirefox22(wnd.getSelection().getRangeAt(0),currentColor,forecolor,wnd.document,selectionstring,occurence);
        wnd.getSelection().removeAllRanges();
        yawas_storeHighlight(docurl,wnd.document.title,selectionstring,occurence,currentColor,addcommentwhendone);
        return true;
    }
    else
    {
        alert('Sorry, [' + selectionstring + '] was not found.');
        wnd.getSelection().removeAllRanges();
        return false;
    }
}

function getWindowWithSelection(wnd)
{
    //alert('hasSelection:' + wnd);
    if (wnd.getSelection().rangeCount>0)
    {
        //alert('found selection:' + wnd.getSelection());
        return wnd;
    }
    else
        return null;
}

function recolor(color)
{
  if (color === 'note')
  {
    let caption = hoverElement.dataset.comment!==null?hoverElement.dataset.comment:'';
    let newcomment = prompt('Enter note',caption);
    if (newcomment !== null)
    {
      newcomment = newcomment.trim();
      if (newcomment.length === 0)
      {
        //hoverElement.style.borderBottom = 0;
        //delete hoverElement.dataset.yawasComment;
        delete hoverElement.dataset.comment;
        delete hoverElement.title;
      }
      else
      {
        //hoverElement.style.borderBottom = '1px dashed black';
        //hoverElement.dataset.yawasComment = newcomment;
        hoverElement.dataset.comment = newcomment;
        hoverElement.title = newcomment;
      }
      updateHighlight(hoverElement,color,newcomment);
      hoverElement = null;
    }
    return;
  }
  else
  {
    hoverElement.dataset.yawasColor = googleColors[color];
    hoverElement.style.backgroundColor = googleColors[color];
    childrenToo(hoverElement,googleColors[color]);
    updateHighlight(hoverElement,color,null);
    // clear the selection (on Firefox we selected the text inside oncontextmenu)
    window.getSelection().removeAllRanges();
  }
}

// from http://stackoverflow.com/questions/1482832/how-to-get-all-elements-that-are-highlighted/1483487#1483487
function rangeIntersectsNode(range, node) {
    var nodeRange;
    if (range.intersectsNode) {
        return range.intersectsNode(node);
    } else {
        nodeRange = node.ownerDocument.createRange();
        try {
            nodeRange.selectNode(node);
        } catch (e) {
            nodeRange.selectNodeContents(node);
        }
        
        return range.compareBoundaryPoints(Range.END_TO_START, nodeRange) == -1 &&
        range.compareBoundaryPoints(Range.START_TO_END, nodeRange) == 1;
    }
}

function sendMessage(info,cb)
{
  //console.log('sendMessage',info);
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

function yawas_chrome(color)
{
    if (color === 'email')
    {
        var info = {
            "title": document.title,
            "url": window.location.href,
            "fn": "emailhighlights",
        };
        sendMessage(info);
        return;
    }
    if (color === 'copytoclipboard')
    {
        var info = {
            "title": document.title,
            "url": window.location.href,
            "fn": "copytoclipboard",
        };
        sendMessage(info);
        return;
    }

    if (color && color !== 'note')
    {
        currentColor = color;
    }
    else
    {
        //currentColor = 'yellow';
    }

    var elem = hoverElementOrSelection();
    if (elem)
    {
      hoverElement = elem;
      recolor(color);
    }
    else
    {
      var wndWithSelection = getWindowWithSelection(window);
      if (color === 'note')
        yawas_tryHighlight(wndWithSelection,true);
      else
        yawas_tryHighlight(wndWithSelection);
    }
}

function yawas_remapAnnotations(highlights)
{
  return highlightDoc(window,document,highlights);
}

function yawas_uncompact(wnd,highlights)
{
	for (var i=0;i<highlights.length;i++)
	{
		//console.log(i,highlights[i].selection,highlights[i].n)
		var sel = highlights[i].selection;
		var chk = sel.split('~~');
		if (chk.length === 2 && chk[1].length === 16)
		{
			wnd.getSelection().removeAllRanges();
			var len = parseInt(chk[0]);
			var first = chk[1].substring(0,8);
			var second = chk[1].substring(8,16);
			//console.log(len,first,second);
			if (wnd.find(first,true,false))
			{
				var s = wnd.getSelection();
				//console.log('found',first);
				var anchor = s.anchorNode;
				var offsetstart = s.anchorOffset;
				//console.log('offset1=',offsetstart);
				if (wnd.find(second,true,false))
				{
					//console.log('found second',second);
					s = wnd.getSelection();
					if (anchor === s.focusNode)
					{
						//console.log('same anchorNode');
						var offsetend = s.focusOffset; // end of match
						//console.log('focusoffset=',offsetend);
						if (offsetend - offsetstart === len)
						{
							var content = s.anchorNode.textContent.replace(/\s/g,' ');
							highlights[i].selection_unpacted = content.substring(offsetstart,offsetend);
							//console.log('setting highlights[',i,']=',highlights[i].selection_unpacted);
						}
						//else
						//	console.error('len not right',offsetend - offsetstart);
					}
					else
					{
						//console.error('not same anchorNode');
						var offsetend = s.focusOffset + anchor.textContent.length;
						if (offsetend - offsetstart === len)
						{
							var content = anchor.textContent.replace(/\s/g,' ') + s.focusNode.textContent.replace(/\s/g,' ');
							highlights[i].selection_unpacted = content.substring(offsetstart,offsetend);
							//console.log('setting highlights[',i,']=',highlights[i].selection_unpacted);
						}
					}
				}
			}
			else
			{
				//console.error('compacted highlight not found',highlights[i].selection);
			}
		}
	}
}

function highlightDoc(wnd,doc,highlights)
{
    let previousRange = null;
    if (wnd.getSelection().rangeCount > 0)
      previousRange = wnd.getSelection().getRangeAt(0);
    var scrollLeft = wnd.scrollX;
    var scrollTop = wnd.scrollY;
    nremapped = 0;
    notRemapped = [];
    yawas_uncompact(wnd,highlights);
    for (var i=0;i<highlights.length;i++)
    {
        wnd.getSelection().removeAllRanges();
        var selectionString = highlights[i].selection;
        if (highlights[i].selection_unpacted)
        	selectionString = highlights[i].selection_unpacted;
        var n = 0;
        while (n<highlights[i].n && wnd.find(selectionString,true,false))
        {
            n++;
        }
        if (n == highlights[i].n && wnd.find(selectionString,true,false))
        {
          try {
            highlightNowFirefox22(wnd.getSelection().getRangeAt(0), highlights[i].color, forecolor, doc, highlights[i].selection, highlights[i].n,highlights[i].comment);
            nremapped++;
          }
          catch(e){
            console.error('error highlightNowFirefox22',e);
          }
        }
        else
          notRemapped.push(highlights[i]);
    }
    wnd.getSelection().removeAllRanges();
    wnd.scrollTo(scrollLeft,scrollTop);
    if (previousRange)
      wnd.getSelection().addRange(previousRange);
    return nremapped;
}

function highlightNowFirefox22(selectionrng,color,textcolor,doc, selectionstring,occurence,comment)
{
    var body = doc.body;
    if (!body)
    {
        return null;
    }
    
    var baseNode = doc.createElement("yawas");//span was changing styling on some web pages
    baseNode.className = 'yawas-highlight';
    baseNode.style.backgroundColor = googleColors[color];
    if (comment && comment > '')
    {
      baseNode.dataset.comment = comment;
      //baseNode.dataset.yawasComment = comment;
      baseNode.title = comment;
      //baseNode.style.borderBottom = '1px dashed black';
    }
    baseNode.dataset.selection = selectionstring;
    baseNode.dataset.yawasOccurence = occurence;
    baseNode.dataset.yawasColor = googleColors[color];

    var node = yawas_highlight222(selectionrng, baseNode, googleColors[color]);
    
    node.addEventListener('mouseover',function (e) {
      hoverElement = this;
    },false);

    node.addEventListener('mouseout',function (e) {
      hoverElement = null;
    },false);

    return node;
}

// on Firefox, we need to select the text before showing the context menu
// on Chrome, somehow the current word is selected when the user right clicks over words
window.oncontextmenu = function () {
  if (hoverElement !== null)
  {
    let selection = window.getSelection();
    if (selection.rangeCount > 0) {
      selection.removeAllRanges();
    }
    let range = document.createRange();
    range.selectNode(hoverElement);
    selection.addRange(range);
  }
}

function childrenToo(docfrag,backgroundColor)
{
    docfrag.childNodes.forEach(f => {if (f.style){f.style.backgroundColor = backgroundColor}});
}

function yawas_highlight222(range, node,backgroundColor)
{
    var startContainer = range.startContainer;
    var startOffset = range.startOffset;
    var endOffset = range.endOffset;
    var docfrag = range.extractContents();
    childrenToo(docfrag,backgroundColor);
    var before = startContainer.splitText(startOffset);
    var parent = before.parentNode;
    node.appendChild(docfrag);
    parent.insertBefore(node, before);
    return node;
}

function updateHighlight(elt,color,newcomment)
{
    if (elt)
    {
        sendMessage({action: "recolor_highlight", highlightString: hoverElement.dataset.selection, n:hoverElement.dataset.yawasOccurence, newcolor: color, comment:newcomment}, function (res){
          if (res.error)
          {
            console.error(res);
            yawas_undohighlight();
          } 
        });
    }
}

// replaced with commands inside manifest.json
// so users can customize their shortcuts

/*const codes = [89,82,66,71,68,67];

function keyListener(e)
{
  if (e.ctrlKey && e.keyCode && e.shiftKey) {
    var stop = codes.indexOf(e.keyCode) !== -1;
    if (stop)
    {
      e.preventDefault();
      e.stopPropagation();
    }
    if (e.keyCode === 89)
      yawas_chrome('yellow');
    else if (e.keyCode === 82)
      yawas_chrome('red');
    else if (e.keyCode === 66)
      yawas_chrome('blue');
    else if (e.keyCode === 67)
      yawas_chrome('note');
    else if (e.keyCode === 71) // Green
      yawas_chrome('green');
    else if (e.keyCode === 68)
      yawas_delete_highlight();
  }
}*/

function hoverElementOrSelection() {
  if (hoverElement !== null)
    return hoverElement;
  var wndWithSelection = getWindowWithSelection(window);
  if (!wndWithSelection)
    return null;
  let rng = wndWithSelection.getSelection().getRangeAt(0);
  let elems = document.querySelectorAll('.yawas-highlight');
  
  for (let i=0;i<elems.length;i++)
  {
    if (rangeIntersectsNode(rng,elems[i].firstChild))
      return elems[i];
  }
  return null;
}

function yawas_delete_highlight() {
  let elem = hoverElementOrSelection();
  if (elem)
  {
    sendMessage({action: "delete_highlight", highlightString: elem.dataset.selection, n:elem.dataset.yawasOccurence });
    childrenToo(elem,null);
    var f = document.createDocumentFragment();
    while(elem.firstChild)
        f.appendChild(elem.firstChild);
    elem.parentNode.replaceChild(f,elem);
    hoverElement = null;
    updateHighlightCaption();
  }
}

/*function editLocally()
{
  var docurl = yawas_getGoodUrl(document);
  var editPageURL = chrome.extension.getURL('localedit.html?url=' + docurl);
  alert(editPageURL);
  var a = window;
  a.open(editPageURL, "bkmk_popup", "left="+((a.screenX||a.screenLeft)+10)+",top="+((a.screenY||a.screenTop)+10)+",height=420px,width=550px,resizable=1,alwaysRaised=1");
}

function yawas_chrome_edit()
{
  isSavingLocally(function (res) {
    if (res === true)
    {
      return editLocally();
    }
    if (window.top !== window)
      return;
    try {
        var doc = document;
        var docurl = yawas_getGoodUrl(doc);
        var url = encodeURIComponent(docurl);
        var title = encodeURIComponent(doc.title);
        var a=window;
        a.open("https://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=" + url + "&title="  + title, "bkmk_popup", "left="+((a.screenX||a.screenLeft)+10)+",top="+((a.screenY||a.screenTop)+10)+",height=420px,width=550px,resizable=1,alwaysRaised=1");
    } catch (e) { console.error('edit error:' + e); }
  });
}*/

var currentHighlight = 0;

function showDonateButton()
{
    var donatewrapper = document.createElement('div');
    donatewrapper.style.position = 'fixed';
    donatewrapper.style.zIndex = 200000;
    donatewrapper.style.margin = '0px';
    donatewrapper.style.padding = '16px';
    donatewrapper.style.backgroundColor = '#190B33';
    donatewrapper.style.fontSize = '13pt';
    donatewrapper.style.fontFamily = '"avenir next",Helvetica';
    donatewrapper.style.right = '8px';
    donatewrapper.style.top = '8px';
    donatewrapper.style.borderRadius = '0px';
    donatewrapper.style.color = 'white';
    donatewrapper.style.boxShadow = '0 0 3px black';
    donatewrapper.style.transform = 'translateY(-400px)';
    donatewrapper.style.opacity = 0;
    donatewrapper.style.transition = 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out';

    donatewrapper.innerHTML = '<span style="color:white;margin:16px;padding:16px">Please support Yawas<span>';
    var donate = document.createElement('button');
    donate.addEventListener('click',function () {
      donatewrapper.style.opacity = 0;
      setTimeout(function () {
        donatewrapper.parentElement.removeChild(donatewrapper);
      },400);
      chrome.storage.sync.set({
          showdonate: false,
        }, function() {
      });
      sendMessage({'fn':'yawas_donate'});
    });
    donate.textContent = 'Donate';
    donate.style.backgroundColor = 'rgb(255, 196, 57)';
    donate.style.color = 'black';
    donate.style.display = 'block';
    donate.style.marginLeft = 'auto';
    donate.style.marginRight = 'auto';
    donate.style.padding = '8px 16px';
    donate.style.marginTop = '16px';
    donate.style.borderRadius = '32px';
    donate.setAttribute('title','Donate to support Yawas');
    donate.style.cursor = 'pointer';
    donate.style.border = 0;
    donate.style.boxShadow = '0 0 3px black';
    donate.style.fontSize = '13px';
    donate.style.fontWeight = 'bold';
    donate.addEventListener('mouseover',function () {this.style.color='white';});
    donate.addEventListener('mouseout',function () {this.style.color='black';});

    var close = document.createElement('button');
    close.addEventListener('click',function () {
      donatewrapper.style.opacity = 0;
      donatewrapper.style.transform = 'translateY(-400px)';
      setTimeout(function () {
        donatewrapper.parentElement.removeChild(donatewrapper);
      },400);
      chrome.storage.sync.set({
        showdonate: false,
      }, function() {
      });
      //alert('You can always DONATE later (click the Yawas star icon)');
    });
    close.style.position = 'absolute';
    close.style.left = '4px';
    close.style.top = '4px';
    close.addEventListener('mouseover',function () {this.style.color='gray';});
    close.addEventListener('mouseout',function () {this.style.color='white';});
    close.style.backgroundColor = 'transparent';
    close.setAttribute('title','Close');
    close.style.borderShadow = null;
    close.style.boxShadow = '0 0 0px black';
    close.style.cursor = 'pointer';
    close.style.color = 'white';
    close.style.display = 'block';
    close.style.fontWeight = 'bold';
    close.style.fontSize = '12px';
    close.style.textAlign = 'center';
    close.style.border = 0;
    close.style.outline = 'none';
    close.textContent = '✕';
    donatewrapper.appendChild(donate);
    donatewrapper.appendChild(close);
    document.body.appendChild(donatewrapper);
    setTimeout(function () { donatewrapper.style.opacity = 1; donatewrapper.style.transform = 'translateY(0)';},2000);
}

function addStyle(doc,css)
{
  var style = document.createElement('style');
  style.innerHTML = css;
  doc.head.appendChild(style);
}

function yawas_next_highlight()
{
  if (!signedin)
    return yawas_signin();
    
    var highlights = document.getElementsByClassName('yawas-highlight');
    if (highlights.length==0)
        return;
    currentHighlight = currentHighlight % highlights.length;
    updateHighlightCaption();
    let h = highlights[currentHighlight];
    h.style.transition = 'opacity 0.3s ease-in-out';
    h.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    h.style.opacity = 0.2;
    currentHighlight += 1;
    setTimeout(function () { h.style.opacity=1.0; }, 300);
}

//console.log('here');

window.onhashchange = function (evt) {
  askForAnnotations(2000);
};
if (document.location.hostname === 'toolbar.google.com' && document.location.pathname === '/command' && document.location.search && document.location.search.indexOf('close_browser') !== -1)
{
    window.close();
    sendMessage({fn: "yawas_toolbar_signed_in"});
}
else if (document.location.href.indexOf('accounts.google.com/ServiceLogin') != -1)
{
    //console.error('not asking getannotations for servicelogin window');
}
else
{
    //window.addEventListener("keydown", keyListener, false);
    if (window.top !== window)
    {
        //console.error('cookkie_handler not calling getannotations because not top window');
    }
    else
    {
        addHighlightsWrapper();
        addStyle(window.document,'.yawas-highlight:hover{opacity:0.6;}.yawas-highlight[data-comment]{border-bottom:1px dashed black}');
        askForAnnotations(2000);
    }
    var elems = document.querySelectorAll('*');
    for (var i=0;i<elems.length;i++)
    {
        if (elems[i].style)
        {
            elems[i].style.userSelect='text';
            //elems[i].style.webkitUserSelect='text';
        }
    }
}
