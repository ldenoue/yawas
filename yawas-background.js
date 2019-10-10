var signedin = false;
var highlightswrapper = document.querySelector('#yawas_highlightswrapper');
var requestTimeout = 1000 * 5;  // 5 seconds
var abortTimerId = null;
var urls = {};
var cachedAnnotations = {};
var cachedLabels = {};
var leftMark = '<<';//'&ldquo;'
var rightMark = '>>';//'&rdquo;'
var lenQuote = rightMark.length;
var handlePDF = false;
var saveLocally = false;
var donate_url = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=R9JRASMAABUUE&item_name=Yawas+Web+and+PDF+Highlighter&currency_code=USD&source=chromeextension';
var googleSignature = null;

chrome.storage.sync.get({
    handlePDF: false,
    saveLocally: false,
  }, function(items) {
    handlePDF = items.handlePDF;
    saveLocally = items.saveLocally;
    //console.log('init handlePDF=',handlePDF,'saveLocally=',saveLocally);
  });

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes)
  {
    var storageChange = changes[key];
    if (key === 'handlePDF')
    {
      handlePDF = storageChange.newValue;
      //console.log('handlePDF changed to=',handlePDF);
    }
    if (key === 'saveLocally')
    {
      saveLocally = storageChange.newValue;
      //console.log('saveLocally changed to=',saveLocally);
    }
  }
});

yawas_setStatusIcon("off");

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

async function exportAllBookmarks()
{
    var start = 0;
    var list = [];
    var loop = true;
    while (loop)
    {
        console.log('start=',start);
        var url = 'https://www.google.com/bookmarks/lookup?output=rss&start=' + start;
        var res = await fetch(url);
        var str = await res.text();
        var xml = (new window.DOMParser()).parseFromString(str, "text/xml");
        var items = xml.querySelectorAll('item');
        items.forEach(i => {
                      var title = i.querySelector('title').textContent;
                      var url = i.querySelector('link').textContent;
                      var annotations = i.querySelector('bkmk_annotation')?i.querySelector('bkmk_annotation').textContent:'';
                      list.push({title:title,url:url,annotations:annotations});
                      console.log(url);
                      });
        start += items.length;
        if (items.length === 0)
            loop = false;
    }
    return list;
}

let getannotationscb = {};
let storeannotationscb = {};

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && getannotationscb[tabId]) {
      chrome.tabs.executeScript(tabId, {runAt:'document_end',file: 'yawas-grab-rss.js'}, function (res) {
        chrome.tabs.remove(tabId);
        if (getannotationscb[tabId])
          chrome.windows.remove(getannotationscb[tabId].windowId);
        if (!res || res.length !== 1 || !res[0].signature)
        {
          yawas_setStatusIcon("off");
          //console.log('googleSignature empty');
          if (getannotationscb[tabId])
          {
            getannotationscb[tabId].cb({error:'logged out',signedout:true});
            delete getannotationscb[tabId];
          }
        }
        else
        {
          googleSignature = res[0].signature;
          let webAnnotation = res[0].annotation;
          //console.log('webAnnotation=',webAnnotation,getannotationscb[tabId].url);
          let webLabels = res[0].labels;
          webAnnotation = formatAnnotation(webAnnotation);
          if (getannotationscb[tabId])
          {
            yawas_remapAnnotations(getannotationscb[tabId].url,webAnnotation,webLabels,getannotationscb[tabId].cb);
            delete getannotationscb[tabId];
          }
        }
      });
    }
    else if (changeInfo.status === 'complete' && storeannotationscb[tabId]) {
      chrome.tabs.executeScript(tabId, {runAt:'document_end',code: 'window.location.href'}, function (res) {
        chrome.tabs.remove(tabId);
        if (storeannotationscb[tabId])
          chrome.windows.remove(storeannotationscb[tabId].windowId);

        //console.log(res,res.length,res[0],res[0].indexOf('signin'));
        if (!res || (res.length >= 1 && isSignin(res[0])))
        {
          //console.log('error not signed in');
          if (storeannotationscb[tabId])
            storeannotationscb[tabId].cb({error:'not signed in',signedout:true});
        }
        else
        {
          //console.log('ok, could store highlight');
          if (storeannotationscb[tabId])
            storeannotationscb[tabId].cb({ok:true});
        }
        delete storeannotationscb[tabId];
      });
    }
  }
);

function createHiddenWindow(cb)
{
  chrome.windows.create({state:'minimized'},function (w) {
    if (cb)
      cb(w.id);
  });
}

//createHiddenWindow(null);

function isSignin(url)
{
  let lowUrl = url.toLowerCase();
  return lowUrl.indexOf('accounts.google') !== -1 && (lowUrl.indexOf('signin') !== -1 || lowUrl.indexOf('login') !== -1);
}

function yawas_getAnnotations(webUrl,cb)
{
    webUrl = purifyURL(webUrl);
    if (saveLocally)
    {
      var keyName = webUrl.hashCode();
      var obj = {};
      obj[keyName] = null;
      chrome.storage.sync.get(obj,function(items) {
        if (items[keyName])
        {
          yawas_remapAnnotations(webUrl,items[keyName].annotations,items[keyName].labels,cb);
        }
      });
      return;
    }
    let url = "https://www.google.com/bookmarks/find?output=rss&q=" + encodeURIComponent(webUrl);
    createHiddenWindow(function (windowId) {
      chrome.tabs.create({ windowId: windowId, active: false, url: url }, function (tab) {
        getannotationscb[tab.id] = {windowId: windowId,url:webUrl,cb:cb};
      });
    });
}

function yawas_setStatusIcon(s)
{
    chrome.browserAction.setIcon({path:"yawas_" + s + "_128.png"});
}

function sendMessageActiveTab(json)
{
  chrome.tabs.query({active:true,currentWindow: true}, function(tabs) {
    if (tabs && tabs.length > 0)
    {    
      var tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, json, function(response) {});
    }
  });
}

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return 'yawas'+hash;
};

function yawas_remapAnnotations(url, annotations, labels,cb)
{
    if (annotations === null || annotations === undefined)
    {
      //console.error('yawas_remapAnnotations called without annotations',url,annotations,labels);
      return cb({error:'annotations===null'});
    }
    var url = purifyURL(url);
    cachedAnnotations[url] = annotations;
    cachedLabels[url] = labels;
    var highlights = annotationToArray(annotations);
    chrome.browserAction.setBadgeText({'text':''+highlights.length});
    chrome.browserAction.setTitle({title:'Yawas'});
    urls[url] = highlights.length;
    cb({annotations:highlights});
}

function formatAnnotation(text)
{
    var newtext = text.replace(/&ldquo;/gi,leftMark).replace(/&rdquo;/gi,rightMark);
    //newtext = newtext.replace(/“/gi,leftMark).replace(/”/gi,rightMark);
    //newtext = text.replace(/<</gi,'&ldquo;').replace(/>>/gi,'&rdquo;');
    //newtext = newtext.replace(/“/gi,'&ldquo;').replace(/”/gi,'&rdquo;');
    return newtext;
}

function yawas_compact(webAnnotation)
{
    var highlights = annotationToArray(webAnnotation);
    for (var i=0;i<highlights.length;i++)
    {
    	var sel = highlights[i].selection;
    	if (sel.indexOf('~~') !== -1) // already compacted
    		continue;
    	var len = sel.length;
    	if (len >= 16)
    	{
    		sel = len + '~~' + sel.substring(0,8) + sel.substring(len-8);
        highlights[i].selection = sel;
      }
    }
    return arrayToAnnotation(highlights)
}

function yawas_storeHighlight(webUrl,title,highlight,occurence,couleur,pagenumber,cb)
{
    var qurl = purifyURL(webUrl);
    
    // new version uses cache and google signature
    var webAnnotation = cachedAnnotations[qurl];
    var webLabels = cachedLabels[qurl];
    if (!webAnnotation)
    {
        //console.error('no webannotation cached for',webUrl,qurl);
        webAnnotation = '';
    }
    if (!webLabels)
        webLabels = '';
    webAnnotation = formatAnnotation(webAnnotation);
    if (occurence === 0)
    {
        if (pagenumber)
            webAnnotation += leftMark + highlight + "@" + occurence + ',' + pagenumber;
        else
            webAnnotation += leftMark + highlight;
    }
    else
    {
        webAnnotation += leftMark + highlight + "@" + occurence;
        if (pagenumber)
            webAnnotation += ',' + pagenumber;
    }
    if (couleur != 'yellow')
        webAnnotation += '#' + couleur;
    webAnnotation += rightMark + " ";
    if (webAnnotation.length > 2048)
    {
    	console.log('too long so compacting annotations',qurl,webAnnotation.length);
    	var compacted = yawas_compact(webAnnotation);
    	if (compacted.length > 2048)
    	{
    	  yawas_setStatusIcon('error');
      	return cb({toobig:true});
      }
      else
      {
      	console.log('compacted format len=',compacted.length);
      	webAnnotation = compacted;
      }
    }
    yawas_storeHighlightsNow(qurl, title, webLabels, webAnnotation, googleSignature, function (res){
     if (res.ok)
     {
      yawas_setStatusIcon('on');
       var nannotations = webAnnotation.split(rightMark).length-1;
       chrome.browserAction.setBadgeText({'text':''+nannotations});
       chrome.browserAction.setTitle({title:'Yawas'});
       urls[qurl] = nannotations;
       cachedAnnotations[qurl] = webAnnotation;
       return cb({addedhighlight:true});
     }
     else
     {
        yawas_setStatusIcon('error');
        return cb(res);
     }
   });
}

function yawas_storeHighlightsNow(webUrl, title, labels, annotations, gooSignature, callback)
{
    if (saveLocally)
    {
      var keyName = purifyURL(webUrl).hashCode();
      var obj = {};
      obj[keyName] = {title:title,labels:labels,annotations:annotations};
      chrome.storage.sync.set(obj,function() {
      });
      return callback({ok:true});
    }

    if (!gooSignature)
    {
        callback({error:'not signed in',signedout:true});
        return;
    }
    webUrl = purifyURL(webUrl);
    
    var url = "https://www.google.com/bookmarks/mark?hl=en";
    url += "&sig=" + gooSignature;
    url += "&title=" + encodeURIComponent(title);
    url += "&bkmk=" + encodeURIComponent(webUrl);
    url += "&labels=" + encodeURIComponent(labels);
    url += "&annotation=" + encodeURIComponent(annotations);

    createHiddenWindow(function (windowId) {
      chrome.tabs.create({ windowId: windowId, active: false, url: url }, function (tab) {
       storeannotationscb[tab.id] = {windowId: windowId,cb:callback};
     });
    });
}

function refreshBrowserAction(url)
{
    var qurl = purifyURL(url);
    if (urls[qurl] != undefined)
    {
        chrome.browserAction.setBadgeText({'text':''+urls[qurl]});
    }
    else
        chrome.browserAction.setBadgeText({'text':'0'});
    chrome.browserAction.setTitle({title:'Yawas'});
}

function copyTextToClipboard(text) {
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  body.removeChild(copyFrom);
  alert('Highlights are in your clipboard');
}

function yawas_copyclipboard(url,title)
{
    //console.log('yawas_copyclipboard',url,title);
    url = purifyURL(url);
    if (title.trim().length == 0)
        title = 'no title';
    var webAnnotation = cachedAnnotations[url];
    var highlights = annotationToArray(webAnnotation);
    var body = title + '\n' + url + '\n';
    for (var i=0;i<highlights.length;i++)
    {
      if (highlights[i].comment)
        body += highlights[i].comment + ' ';
      body += '<<' + highlights[i].selection + '>>\n';
    }
    copyTextToClipboard(body);
}

function yawas_email(url,title)
{
    console.log('yawas_email',url,title);
    url = purifyURL(url);
    if (title.trim().length == 0)
        title = 'no title';
    var webAnnotation = cachedAnnotations[url];
    var highlights = annotationToArray(webAnnotation);
    var body = title + '\n\n' + url + '\n\n';
    for (var i=0;i<highlights.length;i++)
    {
      if (highlights[i].comment)
        body += highlights[i].comment + ' ';
      body += '<<' + highlights[i].selection + '>>\n';
    }
    var compose = "https://mail.google.com/mail/?extsrc=mailto&url=" + encodeURIComponent("mailto:?subject=" + title + "&body=" + body);
    var width = Math.min(screen.width-40,640);
    var height = Math.min(screen.height-40,480);
    var left = Math.floor( (screen.width - width) / 2);
    var top = Math.floor( (screen.height - height) / 2);
    //alert(compose);
    window.open(compose,'email_popup','left='+left+',top='+top+',height='+height+'px,width='+width+'px,resizable=1');
}

// deprecated in Chrome and does not work in Firefox
/*chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
  chrome.tabs.query({active:true,currentWindow: true}, function(tabs) {
    if (tabs && tabs.length > 0 && tabs[0].url)
    {
      var tab = tabs[0];
      refreshBrowserAction(tab.url);
    }
  });
});*/

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab && tab.url)
    refreshBrowserAction(tab.url);
});

function getEmailHandler()
{
    return function(info, tab) {
        var url = isPDF(tab.url);
        var title = tab.title;
        //alert('calling with url='+url+'-'+title);
        yawas_email(url,title);
    };
}

function getCopyClipboardHandler()
{
  return function(info, tab) {
    var url = isPDF(tab.url);
    var title = tab.title;
    yawas_copyclipboard(url,title);
};
}

function getClickHandler() {
  return function(info, tab) {
    var color = info.menuItemId;
    sendMessageActiveTab({action:'yawas_chrome',color:color,url:info.pageUrl});
  };
};

function arrayToAnnotation(highlights)
{
    var annotation = '';
    for (var i=0;i<highlights.length;i++)
    {
      if (highlights[i].comment)
        annotation += highlights[i].comment;
      annotation += leftMark + highlights[i].selection;
      if (highlights[i].p)
        annotation += '@' + highlights[i].n + ',' + highlights[i].p;
      else if (highlights[i].n > 0)
          annotation += '@' + highlights[i].n;
      if (highlights[i].color != 'yellow')
          annotation += '#' + highlights[i].color;
      annotation += rightMark + ' ';
    }
    return annotation;
}

function annotationToArray(annotations)
{
    if (annotations === null)
      return [];
    if (annotations.trim().length === 0)
      return [];
    var chuncks = annotations.split(rightMark);
    var highlights = [];
    for (var i=0;i<chuncks.length;i++)
    {
        var j = chuncks[i].indexOf(leftMark);
        if (j>=0)
        {
            var comment = chuncks[i].substring(0,j).trim();
            var highlight = chuncks[i].substring(j+lenQuote);
            var k = highlight.lastIndexOf('@');
            var occurence = 0;
            var couleur = 'yellow';
            var pagenumber = null;
            if (k > 0)
            {
                try {
                    var string = highlight.substring(k+1);
                    var c = highlight.indexOf('#',k);
                    if (c != -1)
                    {
                        var trail = highlight.substring(k+1,c);
                        var chk = trail.split(',');
                        //occurence = parseInt(highlight.substring(k+1,c));
                        occurence = parseInt(chk[0]);
                        if (chk.length===2)
                            pagenumber = parseInt(chk[1]);
                        couleur = highlight.substring(c+1);
                    }
                    else
                    {
                        //occurence = parseInt(highlight.substring(k+1));
                        var trail = highlight.substring(k+1);
                        var chk = trail.split(',');
                        occurence = parseInt(chk[0]);
                        if (chk.length===2)
                            pagenumber = parseInt(chk[1]);
                    }
                    highlight = highlight.substring(0,k);
                } catch (eint) { occurence = 0; }
            }
            else
            {
                var c = highlight.lastIndexOf('#');
                if (c>0)
                {
                    couleur = highlight.substring(c+1);
                    highlight = highlight.substring(0,c);
                }
            }
            highlight = highlight.trim();//yawas_TrimString(highlight);
            var obj = {p:pagenumber,selection:highlight,n:occurence,color:couleur,comment:comment};
            highlights.push(obj);
        }
    }
    return highlights;
}

function requestCallback(request, sender, sendResponse)
{
  var tabTitle = sender.tab.title;
  var tabURL = purifyURL(sender.tab.url);
  
  //console.log(tabURL,sender.tab.id);
  if (request.fn === 'yawas_getAnnotations')
  {
    yawas_getAnnotations(request.url,function(res){
      signedin = !res.error;
      sendResponse(res);
    });
  }
  else if (request.fn === 'yawas_donate')
  {
    chrome.tabs.create({ url: donate_url });
    sendResponse({});
  }
  else if (request.fn === 'yawas_toolbar_signed_in')
  {
    signedin = true;
    sendResponse({});
  }
  else if (request.fn === 'addhighlight')
  {
     yawas_storeHighlight(request.url,request.title,request.selection,request.occurence,request.couleur,null,function (res){
      signedin = !res.error;
      sendResponse(res);
     });
  }
  else if (request.fn === 'addhighlightpdf')
  {
    yawas_storeHighlight(request.url,request.title,request.selection,request.occurence,request.couleur,request.p,function(res){
      sendResponse(res);
    });
  }
  else if (request.fn === 'emailhighlights')
  {
    yawas_email(request.url,request.title);
    sendResponse({});
  }
  else if (request.fn === 'copytoclipboard')
  {
    yawas_copyclipboard(request.url,request.title);
    sendResponse({});
  }
  else if (request.action == 'delete_highlight')
    delHighlightNow(request.highlightString,request.n,tabURL,tabTitle,null,function (res){
      sendResponse(res);
    });
  else if (request.action == 'delete_pdf_highlight')
    delHighlightNow(request.highlightString,request.n,request.url,request.title,request.p,function(res){
      sendResponse(res);
    });
  else if (request.action == 'recolor_highlight')
    updateHighlight(request.highlightString,request.n,request.newcolor,request.comment,tabURL,tabTitle,null,function(res){
      sendResponse(res);
    });
  else if (request.action == 'recolor_pdf_highlight')
    updateHighlight(request.highlightString,request.n,request.newcolor,'',request.url,request.title,request.p,function(res){
      sendResponse(res);
    });
    
  // important: we want to use sendResponse asynchronously sometimes (e.g. fetching annotations using XHR)
  return true;

}

chrome.runtime.onMessage.addListener(requestCallback);

function updateHighlight(fragment, occurence, newcolor, comment, url, title,pagenumber,cb)
{
    var qurl = url;
    var j = qurl.lastIndexOf('/index.htm');
    if (j == -1)
        j = qurl.lastIndexOf('/index.html');
    if (j != -1)
        qurl = qurl.substring(0,j+1);
    webAnnotation = cachedAnnotations[qurl];
    if (!webAnnotation)
    {
        return cb({error:'no annotation found'});
    }
    
    var highlights = annotationToArray(webAnnotation);
    var idx = -1;
    for (var i=0;i<highlights.length;i++)
    {
        if (highlights[i].selection == fragment && highlights[i].n == occurence)
        {
            if (idx != -1)
            {
                //console.error('[' + fragment + '] found in more than one highlight, please select more text to identify which highlight to delete');
                return cb({error:'found in more than one highlight'});
            }
            else
                idx = i;
        }
    }
    if (idx == -1)
    {
        return cb({error:'Highlight not found'});
    }
    else
    {
      if (newcolor === 'note')
        highlights[idx].comment = comment;
      else
        highlights[idx].color = newcolor;
      webAnnotation = arrayToAnnotation(highlights);
      var webLabels = cachedLabels[qurl];
      if (!webLabels)
          webLabels = '';
      //cachedAnnotations[qurl] = webAnnotation;
      if (webAnnotation.length > 2048)
        return cb({error:'too long'});
      yawas_storeHighlightsNow(url, title, webLabels, webAnnotation, googleSignature, function (res){
        if (res.ok)
        {
          cachedAnnotations[qurl] = webAnnotation;

          cb({highlights:highlights});
        }
        else
          cb(res);
      });
    }
    
}

function delHighlightNow(fragment,occurence,url,title,pagenumber,cb)
{
    var qurl = purifyURL(url);
    webAnnotation = cachedAnnotations[qurl];
    if (!webAnnotation)
    {
        return cb({error:'no annotation found'});
    }
    
    var highlights = annotationToArray(webAnnotation);
    var idx = -1;
    for (var i=0;i<highlights.length;i++)
    {
        var same = highlights[i].selection == fragment;
        if (same && highlights[i].n == occurence)
        {
            if (idx != -1)
            {
                console.log('[' + fragment + '] found in more than one highlight, please select more text to identify which highlight to delete');
                return cb({error:'found in more than one highlight'});
            }
            else
                idx = i;
        }
    }
    if (idx == -1)
    {
        console.log('delHighlightNow error: Highlight not found [' + fragment + ']');
        return cb({error:'not found'});
    }
    else
    {
        //alert('removing ' + highlights[idx].selection);
        //var deletedText = highlights[idx].selection;
        highlights.splice(idx,1);
        webAnnotation = arrayToAnnotation(highlights);
        //alert(webAnnotation);
        var webLabels = cachedLabels[qurl];
        if (!webLabels)
            webLabels = '';
        if (urls[qurl])
        {
            urls[qurl] -= 1;
            refreshBrowserAction(qurl);
        }
        yawas_storeHighlightsNow(url, title, webLabels, webAnnotation, googleSignature, function(res){
          if (res.ok)
          {
            cachedAnnotations[qurl] = webAnnotation;
            cb({highlights:highlights});
          }
          else
            cb(res);
         });
    }
}


function getDonateHandler() {
    return function(info, tab) {
        chrome.tabs.create({ url: donate_url});
    };
}

function getDeleteHandler() {
    return function(info, tab) {
        sendMessageActiveTab({action:'yawas_delete_highlight'});
    };
}

function getSearchHandler() {
  return function(info, tab) {
    chrome.tabs.create({url:'https://www.google.com/bookmarks/?hl=en#!view=threadsmgmt&fo=Starred&q=&g=Time'});
  };
}

function isPDF(href)
{
    if (href.indexOf('pdf_viewer.html') === -1)
        return href;
    let comps = href.split('?file=');
    if (comps.length > 1)
        return decodeURIComponent(comps[1])
    else
        return href;
}
function getEditHandler() {
  return function(info, tab) {
    let possiblePDFUrl = isPDF(tab.url);
    //sendMessageActiveTab({action:'yawas_chrome_edit'});
    if (saveLocally)
      chrome.tabs.create({url:chrome.extension.getURL('localedit.html?url=' + purifyURL(possiblePDFUrl))});
    else
      chrome.tabs.create({url:"https://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=" + purifyURL(possiblePDFUrl) + "&title="  + tab.title});
  };
}

chrome.contextMenus.create({
                           "id" : "donate",
                           "title" : "Donate💰",
                           "type" : "normal",
                           "contexts" : ["selection","page"],
                           "onclick" : getDonateHandler()
                           });

chrome.contextMenus.create({
                           "id" : "yellow",
                           "title" : "Yellow",// (Ctrl-Shift-Y)",
                           "type" : "normal",
                           "contexts" : ["selection"],
                           "onclick" : getClickHandler()
                           });
chrome.contextMenus.create({
                           "id" : "red",
                           "title" : "Red",// (Ctrl-Shift-R)",
                           "type" : "normal",
                           "contexts" : ["selection"],
                           "onclick" : getClickHandler()
                           });
chrome.contextMenus.create({
                           "id" : "blue",
                           "title" : "Blue",// (Ctrl-Shift-B)",
                           "type" : "normal",
                           "contexts" : ["selection"],
                           "onclick" : getClickHandler()
                           });
chrome.contextMenus.create({
                           "id" : "green",
                           "title" : "Green",// (Ctrl-Shift-G)",
                           "type" : "normal",
                           "contexts" : ["selection"],
                           "onclick" : getClickHandler()
                           });

chrome.contextMenus.create({
                           "id" : "note",
                           "title" : "Comment",// (Ctrl-Shift-C)",
                           "type" : "normal",
                           "contexts" : ["selection"],
                           "onclick" : getClickHandler()
                           });

chrome.contextMenus.create({
                           "id" : "delete",
                           "title" : "Delete",// (Ctrl-Shift-D)",
                           "type" : "normal",
                           "contexts" : ["selection"],
                           "onclick" : getDeleteHandler()
                           });

chrome.contextMenus.create({
                           "id" : "copyclipboard",
                           "title" : "Copy",
                           "type" : "normal",
                           "contexts" : ["page"],
                           "onclick" : getCopyClipboardHandler()
                           });

chrome.contextMenus.create({
                           "id" : "email",
                           "title" : "Email",
                           "type" : "normal",
                           "contexts" : ["page"],
                           "onclick" : getEmailHandler()
                           });

chrome.contextMenus.create({
                           "id" : "search",
                           "title" : "Search",
                           "type" : "normal",
                           "contexts" : ["page"],
                           "onclick" : getSearchHandler()
                           });
chrome.contextMenus.create({
                           "id" : "edit",
                           "title" : "Edit",
                           "type" : "normal",
                           "contexts" : ["page"],
                           "onclick" : getEditHandler()
                           });
                           
chrome.commands.onCommand.addListener(function(command) {
  if (command === 'yawas-yellow')
    sendMessageActiveTab({action:'yawas_chrome',color:'yellow'});
  else if (command === 'yawas-red')
    sendMessageActiveTab({action:'yawas_chrome',color:'red'});
  else if (command === 'yawas-blue')
    sendMessageActiveTab({action:'yawas_chrome',color:'blue'});
  else if (command === 'yawas-green')
    sendMessageActiveTab({action:'yawas_chrome',color:'green'});
  else if (command === 'yawas-delete')
    sendMessageActiveTab({action:'yawas_delete_highlight'});
  else if (command === 'yawas-note')
    sendMessageActiveTab({action:'yawas_chrome',color:'note'});
});
                           
function purifyURL(href)
{
  if (href && href.indexOf('https://mail.google') === 0)
    return href;

  try {
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
    return url;
  } catch (eurl) { return href; }
}

/*chrome.browserAction.onClicked.addListener(function(tab) {
  try {
    sendMessageActiveTab({action:'yawas_next_highlight'});
 } catch (e) {
 }
});*/

var VIEWER_URL = chrome.extension.getURL('/pdf_viewer.html');

function getViewerURL(pdf_url) {
  return VIEWER_URL + '?file=' + encodeURIComponent(pdf_url);
}

function isPdfDownloadable(details) {
  console.log(details);
  if (details.url.indexOf('pdfjs.action=download') >= 0) {
    return true;
  }
  if (details.type === 'main_frame' &&
      details.url.indexOf('=download') === -1) {
    return false;
  }
  var cdHeader = (details.responseHeaders &&
    getHeaderFromHeaders(details.responseHeaders, 'content-disposition'));
  return (cdHeader && /^attachment/i.test(cdHeader.value));
}

function getHeaderFromHeaders(headers, headerName) {
  for (var i = 0; i < headers.length; ++i) {
    var header = headers[i];
    if (header.name.toLowerCase() === headerName) {
      return header;
    }
  }
}

function isPdfFile(details) {
  var header = getHeaderFromHeaders(details.responseHeaders, 'content-type');
  if (header) {
    var headerValue = header.value.toLowerCase().split(';', 1)[0].trim();
    if (headerValue === 'application/pdf') {
      return true;
    }
    if (headerValue === 'application/octet-stream') {
      if (details.url.toLowerCase().indexOf('.pdf') > 0) {
        return true;
      }
      var cdHeader =
        getHeaderFromHeaders(details.responseHeaders, 'content-disposition');
      if (cdHeader && /\.pdf(["']|$)/i.test(cdHeader.value)) {
        return true;
      }
    }
  }
}
chrome.webRequest.onHeadersReceived.addListener(
  function(details) {

    /*var headers = details.responseHeaders;
    var index = headers.findIndex(x=>x.name.toLowerCase() == "x-frame-options");
    if (index !=-1) {
     headers.splice(index, 1);
     console.error('removed x-frame-options');
    }*/
    //return {responseHeaders: headers};

    if (!handlePDF)
      return;
      //return {responseHeaders: headers};
    if (details.method !== 'GET') {
      return;
      //return {responseHeaders: headers};
    }
    if (!isPdfFile(details)) {
      return;
      //return {responseHeaders: headers};
    }
    if (isPdfDownloadable(details)) {
      return;
      //return {responseHeaders: headers};
    }

    var viewerUrl = getViewerURL(details.url);

    if (details.frameId === 0) {
      // Main frame. Just replace the tab and be done!
      chrome.tabs.update(details.tabId, {
        url: viewerUrl,
      });
      return { cancel: true, };
    }
  },
  {
    urls: [
      '<all_urls>'
    ],
    types: ['main_frame', 'sub_frame'],
  },
  ['blocking', 'responseHeaders']);

chrome.webRequest.onBeforeRequest.addListener(
  function onBeforeRequestForFTP(details) {
    if (!handlePDF)
      return;
    if (!true/*Features.extensionSupportsFTP*/) {
      chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequestForFTP);
      return;
    }
    if (isPdfDownloadable(details)) {
      return;
    }
    var viewerUrl = getViewerURL(details.url);
    return { redirectUrl: viewerUrl, };
  },
  {
    urls: [
      'ftp://*/*.pdf',
      'ftp://*/*.PDF'
    ],
    types: ['main_frame', 'sub_frame'],
  },
  ['blocking']);

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (!handlePDF)
      return;

    if (isPdfDownloadable(details)) {
      return;
    }

    var viewerUrl = getViewerURL(details.url);

    return { redirectUrl: viewerUrl, };
  },
  {
    urls: [
      'file://*/*.pdf',
      'file://*/*.PDF'
    ],
    types: ['main_frame', 'sub_frame'],
  },
  ['blocking']);
