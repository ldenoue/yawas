var signedin = false;
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
var saveChromeBookmarks = true;
var googleSignature = null;

var yawasBookmarkId = null;
var annotationWriteLocks = {};
var highlightColors = [
  {id:'yellow', title:'Yellow', hex:'#FFFF66'},
  {id:'red', title:'Red', hex:'#ff9999'},
  {id:'blue', title:'Blue', hex:'#0df'},
  {id:'green', title:'Green', hex:'#99ff99'},
  {id:'khaki', title:'Khaki', hex:'#c7c78d'},
  {id:'chartreuse', title:'Chartreuse', hex:'#ddff77'},
  {id:'scarlet', title:'Scarlet', hex:'#ff6666'},
  {id:'gold', title:'Gold', hex:'#ffcc01'},
  {id:'aqua', title:'Aqua', hex:'#a6ffff'},
  {id:'teal', title:'Teal', hex:'#98cbcb'},
  {id:'lilac', title:'Lilac', hex:'#d9b3ff'},
  {id:'orange', title:'Orange', hex:'#ffd8a4'},
  {id:'pink', title:'Pink', hex:'#ffc4ff'},
  {id:'grey', title:'Grey', hex:'#c0c0c0'},
  {id:'magenta', title:'Magenta', hex:'#ff00ff'}
];

ensureYawasFolder();

async function getBookmark(id) {
  return new Promise((resolve,reject) => {
    chrome.bookmarks.get(id, res => resolve(res && res[0] ? res[0] : null))
  })
}

async function getChildren(id) {
  return new Promise((resolve,reject) => {
    chrome.bookmarks.getChildren(id, res => resolve(res || []))
  })
}

async function updateBookmark(id, obj) {
  return new Promise((resolve,reject) => {
    chrome.bookmarks.update(id,obj,res => resolve(res))
  })
}

async function ensureYawasFolder() {
  if (yawasBookmarkId) {
    let existing = await getBookmark(yawasBookmarkId);
    if (existing && !existing.url && existing.title === 'Yawas')
      return existing;
    yawasBookmarkId = null;
  }

  let res = await search({title:'Yawas'});
  let folder = res.find(item => !item.url && item.title === 'Yawas');
  if (!folder)
    folder = await create({title:'Yawas'});

  yawasBookmarkId = folder.id;
  console.log('yawasBookmarkId=',yawasBookmarkId)
  return folder;
}

async function withAnnotationLock(url, fn) {
  let qurl = purifyURL(url);
  let previous = annotationWriteLocks[qurl] || Promise.resolve();
  let current = previous.catch(() => {}).then(fn);
  annotationWriteLocks[qurl] = current;
  try {
    return await current;
  }
  finally {
    if (annotationWriteLocks[qurl] === current)
      delete annotationWriteLocks[qurl];
  }
}

function getFolderName(url,dateString) {
  let res = 'unknown'
  //if (dateString)
    //res = new Date(dateString).toLocaleDateString('en-US',{year:'numeric',month:'numeri'})
    res = new Date(dateString).getFullYear() + '-' + String((new Date(dateString).getMonth()+1)).padStart(2,'0')
  //else {
    try {
      res = new URL(url).hostname.replace('www.','')
    } catch (e) {
    }
  //}
  return res
}

async function remove(id) {
  if (!id)
    return
  return new Promise((resolve,reject) => {
    chrome.bookmarks.remove(id,res => resolve(res))
  })
}

async function search(obj) {
  return new Promise((resolve,reject) => {
    chrome.bookmarks.search(obj,res => resolve(res))
  })
}

async function getLocal(obj) {
  return new Promise((resolve,reject) => {
    chrome.storage.local.get(obj, res => resolve(res))
  })
}

async function setLocal(obj) {
  return new Promise((resolve,reject) => {
    chrome.storage.local.set(obj, () => resolve())
  })
}

async function removeLocal(key) {
  return new Promise((resolve,reject) => {
    chrome.storage.local.remove(key, () => resolve())
  })
}

function annotationStorageKey(webUrl) {
  return purifyURL(webUrl).hashCode();
}

function equivalentBookmarkUrlKey(webUrl) {
  let purified = purifyURL(webUrl || '');
  try {
    let url = new URL(purified);
    url.hash = '';
    url.hostname = url.hostname.toLowerCase();
    if ((url.protocol === 'http:' && url.port === '80') || (url.protocol === 'https:' && url.port === '443'))
      url.port = '';
    return url.href;
  } catch (e) {
    return purified;
  }
}

function sameBookmarkUrl(left,right) {
  return equivalentBookmarkUrlKey(left) === equivalentBookmarkUrlKey(right);
}

function splitTitleAndAnnotations(title) {
  let chunks = (title || '').split('#__#');
  return {
    title: chunks[0] || '',
    annotations: chunks.length > 1 ? chunks.slice(1).join('#__#') : '',
  };
}

function mergeAnnotationStrings(annotationStrings) {
  let merged = [];
  let seen = {};
  for (let annotations of annotationStrings) {
    let highlights = annotationToArray(annotations);
    for (let highlight of highlights) {
      let key = [
        highlight.selection,
        highlight.n,
        highlight.p,
        highlight.color,
        highlight.comment
      ].join('\u0000');
      if (!seen[key]) {
        seen[key] = true;
        merged.push(highlight);
      }
    }
  }
  return arrayToAnnotation(merged);
}

function subtree(res) {
  let result = []
  if (res.url > '')
    result.push(res)
  if (res.children) {
    for (let c of res.children) {
      result = result.concat(subtree(c))
    }
  }
  return result
}

async function getYawasBookmarks() {
  return new Promise((resolve,reject) => {
    ensureYawasFolder().then(() => {
      console.log(yawasBookmarkId)
      chrome.bookmarks.getSubTree(yawasBookmarkId, res => {
        if (!res || !res[0])
          return resolve([])
        resolve(subtree(res[0]))
      })
    }).catch(() => {
      resolve([])
    })
  })
}

/*
chrome.bookmarks.search({}, async res => {
    res.forEach((item, i) => {
      chrome.bookmarks.remove(item.id)
    });})
*/

async function create(obj) {
  return new Promise((resolve,reject) => {
    chrome.bookmarks.create(obj,res => resolve(res))
  })
}

async function folderExists(name,parentId) {
  await ensureYawasFolder()
  parentId = parentId ? parentId : yawasBookmarkId
  let children = await getChildren(parentId)
  return children.find(f => !f.url && f.title === name)
}

async function createFolder(year,month) {
  await ensureYawasFolder()
  let yearFolder = await folderExists(year)
  if (!yearFolder)
    yearFolder = await create({title:year,parentId: yawasBookmarkId})
  let monthFolder = await folderExists(month,yearFolder.id)
  if (!monthFolder)
    monthFolder = await create({title:month,parentId: yearFolder.id})
  return monthFolder
}

async function createBookmark(obj,date) {
  if (!date)
    date = new Date()
  let year = ''+date.getFullYear()
  let month = date.toLocaleDateString('en-US',{month:'long'})
  let folder = await createFolder(year,month)
  //console.log(year,month,folder)
  return await create({title:obj.title,url:obj.url,parentId: folder.id})
}

async function findYawasBookmarksByUrl(url) {
  if (!yawasBookmarkId)
    await ensureYawasFolder();
  let bookmarks = await getYawasBookmarks();
  return bookmarks
    .filter(item => sameBookmarkUrl(item.url,url))
    .sort((a,b) => (a.dateAdded || 0) - (b.dateAdded || 0));
}

async function findYawasBookmarkByUrl(url) {
  let bookmarks = await findYawasBookmarksByUrl(url);
  return bookmarks[0] || null;
}

async function getStoredAnnotations(webUrl) {
  let key = annotationStorageKey(webUrl);
  let items = await getLocal({[key]: null});
  return items[key];
}

async function storeAnnotations(webUrl, title, labels, annotations, extra = {}) {
  let url = purifyURL(webUrl);
  let key = annotationStorageKey(url);
  let current = await getStoredAnnotations(url);
  let record = Object.assign({}, current || {}, extra, {
    url: url,
    title: title,
    labels: labels,
    annotations: annotations,
    updatedAt: Date.now(),
  });
  if (!record.createdAt)
    record.createdAt = Date.now();
  let obj = {};
  obj[key] = record;
  await setLocal(obj);
  return record;
}

async function getBookmarkData(webUrl) {
  let url = purifyURL(webUrl);
  let record = await getStoredAnnotations(url);
  let bookmarks = await findYawasBookmarksByUrl(url);
  let bookmark = bookmarks[0] || null;

  if (bookmarks.length > 1) {
    let title = '';
    let annotationsToMerge = [];
    if (record && record.annotations)
      annotationsToMerge.push(record.annotations);
    for (let item of bookmarks) {
      let parsed = splitTitleAndAnnotations(item.title);
      if (!title)
        title = parsed.title;
      if (parsed.annotations)
        annotationsToMerge.push(parsed.annotations);
    }
    let annotations = mergeAnnotationStrings(annotationsToMerge);
    let obj = {url: url, title: title + '#__#' + annotations};
    await updateBookmark(bookmark.id, obj);
    for (let i=1;i<bookmarks.length;i++)
      await remove(bookmarks[i].id);
    bookmark = Object.assign({}, bookmark, obj);
    record = await storeAnnotations(url, title, record && record.labels ? record.labels : '', annotations, {
      createdAt: bookmark.dateAdded || Date.now(),
    });
  }

  if (record && !bookmark) {
    await removeLocal(annotationStorageKey(url));
    record = null;
  }

  if ((!record || !record.annotations) && bookmark) {
    let parsed = splitTitleAndAnnotations(bookmark.title);
    if (parsed.annotations) {
      record = await storeAnnotations(url, parsed.title, '', parsed.annotations, {
        createdAt: bookmark.dateAdded || Date.now(),
      });
    }
  }

  if (!record && bookmark) {
    let parsed = splitTitleAndAnnotations(bookmark.title);
    record = {
      url: url,
      title: parsed.title,
      labels: '',
      annotations: parsed.annotations,
      createdAt: bookmark.dateAdded || Date.now(),
      updatedAt: bookmark.dateAdded || Date.now(),
    };
  }

  return {url, record, bookmark};
}

chrome.runtime.onMessage.addListener(requestCallback);

chrome.storage.sync.get({
    handlePDF: false,
    saveLocally: false,
    saveChromeBookmarks: true,
  }, function(items) {
    if (items)
    {
      handlePDF = items.handlePDF;
      saveLocally = items.saveLocally;
      saveChromeBookmarks = items.saveChromeBookmarks;
    }
  });

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes)
  {
    var storageChange = changes[key];
    if (key === 'handlePDF')
    {
      handlePDF = storageChange.newValue;
    }
    if (key === 'saveLocally')
    {
      saveLocally = storageChange.newValue;
    }
    if (key === 'saveChromeBookmarks')
    {
      saveChromeBookmarks = storageChange.newValue;
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

// dangerous deletes all your chrome.Bookmarks
async function deleteYawasFolder() {
  let res = await search({title:'Yawas'})
  for (let item of res) {
    await chrome.bookmarks.remove(item.id)
  }
}

/*async function moveBookmarksIntoFolders() {
  let res = await search({})
  for (let item in res) {
    if (item.parentId === yawasBookmarkId) {
      let folder = getFolderName(item.url)
      let res = await search({title:folder})
      if (res.length === 1) {
        chrome.bookmarks.move(item.id,{parentId:res.id})
      } else {
        await createBookmark({title:item.title,url:item.url})
      }
      chrome.bookmarks.remove(item.id)
    }
  }
}*/

/*async function importAllBookmarks(callback)
{
  //let existing = await search({})
  let existing = await getYawasBookmarks()
  //existing = existing.filter(item => item.url > '')
  let existingUrls = {};
  for (let item of existing) {
    existingUrls[item.url] = true;
    await remove(item.id); // will be recreated properly at the end
  }
  var start = 0;
  //var list = [];
  var loop = true;
  var n = 0;
  let max = 800;
  let importedUrls = new Set()

  // Laurent: note that output=xml returns ALL bookmarks along with tags <label></label>
  while (loop)// && n <= max)
  {
    console.log('start=',start);
    let urlBookmarks = 'https://www.google.com/bookmarks/lookup?output=rss&start=' + start;
    let res = null
    try {
      res = await fetch(urlBookmarks);
    } catch (fetcherror) {
      return callback(n,'error retrieving online google bookmarks')
    }
    chrome.runtime.sendMessage({ msg: "importMessage", start: start, n: n });
    let str = await res.text();
    let xml = (new window.DOMParser()).parseFromString(str, "text/xml");
    let items = xml.querySelectorAll('item');
    for (let i of items) {
      let title = i.querySelector('title').textContent;
      let url = i.querySelector('link').textContent;
      let date = i.querySelector('pubDate')? new Date(i.querySelector('pubDate').textContent) : null;
      if (url.indexOf('file:///') === 0) {
        console.error('not importing file bookmark',url)
      } else if (!(url > '')) {
        console.error('url undefined',url)
      }
      else {
        importedUrls.add(url);
        //let labels = [...i.querySelectorAll('bkmk_label')].map(a => a.textContent).join(",");
        //console.log(labels)
        let annotations = i.querySelector('bkmk_annotation')?i.querySelector('bkmk_annotation').textContent.trim():'';
        n++;
        let newTitle = title;
        if (annotations > '')
          newTitle += '#__#' + annotations;
        if (existingUrls[url]) {
          await remove(existingUrls[url].id);
        }
        await createBookmark({title:newTitle, url:url},date)
      }
    }
    start += items.length;
    if (items.length === 0)
      loop = false;
  }
  // recreate the ones not imported from Google Bookmarks
  for (let item of existing) {
    if (!importedUrls.has(item.url))
    {
      console.log('creating from existing',item.url)
      await createBookmark({title:item.title,url:item.url},new Date(item.dateAdded))
    }
  }

  callback(n);
}*/

//let getannotationscb = {};
//let storeannotationscb = {};


function isSignin(url)
{
  let lowUrl = url.toLowerCase();
  return lowUrl.indexOf('accounts.google') !== -1 && (lowUrl.indexOf('signin') !== -1 || lowUrl.indexOf('login') !== -1);
}

var abortTimerId = null;
var requestTimeout = 1000 * 5;  // 5 seconds

function yawas_getElement(xml, elementname)
{
    var e = xml.getElementsByTagName(elementname);
    if (e.length == 0)
        e = xml.getElementsByTagName('smh:' + elementname);
    if (e==null)
        console.log('yawas_getElement null for: ' + elementname);
    return e;
}

function clearAbortTimer() {
  if (abortTimerId != null)
  {
    window.clearTimeout(abortTimerId);
    abortTimerId = null;
  }
}

async function yawas_getAnnotations_chrome_bookmarks(webUrl,cb)
{
  let {record, bookmark} = await getBookmarkData(webUrl);
  let annotations = record && record.annotations ? record.annotations : '';
  let labels = record && record.labels ? record.labels : '';
  if (!annotations && bookmark) {
    let parsed = splitTitleAndAnnotations(bookmark.title);
    annotations = parsed.annotations;
  }
  if (annotations.length > 0) {
    yawas_remapAnnotations(webUrl,annotations,labels,cb);
  } else {
    delete cachedAnnotations[purifyURL(webUrl)];
    delete cachedLabels[purifyURL(webUrl)];
    cb({noannotation:true});
  }
}

function yawas_getAnnotations_chrome_storage(webUrl,cb) {
  var keyName = purifyURL(webUrl).hashCode();
  var obj = {};
  obj[keyName] = null;
  chrome.storage.sync.get(obj,function(items) {
    if (items && items[keyName])
    {
      yawas_remapAnnotations(webUrl,items[keyName].annotations,items[keyName].labels,cb);
    }
  });
}

async function yawas_getAnnotations(webUrl,cb)
{
    //if (saveLocally)
    //  return yawas_getAnnotations_chrome_storage(webUrl)
    if (saveChromeBookmarks)
      return await yawas_getAnnotations_chrome_bookmarks(webUrl,cb);

    googleSignature = null; // invalidate signature

    webUrl = purifyURL(webUrl);
    //var url = "https://www.google.com/bookmarks/find?output=rss&q=" + encodeURIComponent(webUrl);
    // escape fixes issue https://github.com/ldenoue/yawas/issues/11 because url had ' in it
    var url = "https://www.google.com/bookmarks/find?output=rss&q=" + escape(webUrl);
    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
    abortTimerId = window.setTimeout(function() {
      //console.error('aborted GET for url=',url);
      xhr.abort();  // synchronously calls onreadystatechange
      yawas_setStatusIcon("error");
      cb({error:'network error'});
    }, requestTimeout);

    xhr.open("GET",url,true);
    xhr.onerror = function(error) {
      //console.log('xhr error',error);
      console.log('xhr error');
      clearAbortTimer();
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          if (xhr.status === 200)
          {
              clearAbortTimer();
              if (xhr.responseURL === url) {
                //console.log('got what we wanted, hooray!');
              }
              else {
                yawas_setStatusIcon("off");
                if (xhr.responseURL.indexOf('/ServiceLogin') !== -1)
                {
                  cb({error:'logged out',signedout:true,url:xhr.responseURL});
                }
                else
                  cb({error:'logged out',signedout:true});

                return;
              }

              if (xhr.responseXML === null)
              {
                  yawas_setStatusIcon("error");
                  cb({error:'no XML'});
                  return;
              }
              var signature = yawas_getElement(xhr.responseXML,'signature'); //xhr.responseXML.getElementsByTagName('signature');
              var gooSignature = '';
              if (signature.length>0)
                  gooSignature = signature[0].childNodes[0].nodeValue;
              googleSignature = gooSignature;
              //console.log('setting googleSignature to ' + googleSignature);

              yawas_setStatusIcon("on");

              var items = yawas_getElement(xhr.responseXML, 'item'); //xhr.responseXML.getElementsByTagName('item');
              if (items.length === 0)
              {
                  //console.error('items.length == 0');
                  return cb({noannotation:true});
              }
              else if (items.length >= 1)
              {
                  for (var i=0;i<items.length;i++)
                  {
                      try {
                          var annotation = yawas_getElement(items[i],'bkmk_annotation'); //items[i].getElementsByTagName('bkmk_annotation');
                          var webAnnotation = '';
                          if (annotation.length>0)
                              webAnnotation = annotation[0].childNodes[0].nodeValue;

                          var labels = yawas_getElement(items[i],'bkmk_label'); //items[i].getElementsByTagName('bkmk_label');
                          var webLabels = '';
                          if (labels.length>0)
                          {
                              for (var x=0;x<labels.length;x++)
                                  webLabels += labels[x].childNodes[0].nodeValue + ',';
                          }
                          webAnnotation = formatAnnotation(webAnnotation);
                          yawas_remapAnnotations(webUrl,webAnnotation,webLabels,cb);
                      } catch (escript) { console.error(escript); }
                  }
              }
          }
          else
          {
              clearAbortTimer();
          }
      }
    };
    xhr.send(null);
}

function yawas_setStatusIcon(s)
{
    chrome.action.setIcon({path:"yawas_" + s + "_128.png"});
}

function sendMessageActiveTab(json)
{
  chrome.tabs.query({active:true,currentWindow: true}, function(tabs) {
    if (tabs && tabs.length > 0)
    {
      var tab = tabs[0];
      //chrome.tabs.sendMessage(tab.id, json, function(response) {});
      const port = chrome.tabs.connect(tab.id);
      port.onDisconnect = function (err) { console.error('disconnected',err)};
      /*port.onMessage.addListener((response) => {
        console.error('port.onMessage response=',response);
      });*/
      port.postMessage(json);
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
    chrome.action.setBadgeText({'text':''+highlights.length});
    chrome.action.setTitle({title:'Yawas'});
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
    withAnnotationLock(qurl, async () => {
      // new version uses cache and google signature
      var webAnnotation = cachedAnnotations[qurl];
      var webLabels = cachedLabels[qurl];
      if (!webAnnotation && saveChromeBookmarks)
      {
        let {record, bookmark} = await getBookmarkData(qurl);
        if (record && record.annotations)
        {
          webAnnotation = record.annotations;
          webLabels = record.labels || '';
        }
        else if (bookmark)
        {
          let parsed = splitTitleAndAnnotations(bookmark.title);
          webAnnotation = parsed.annotations;
        }
      }
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
      let pureLen = webAnnotation.length;
      if (!saveChromeBookmarks && webAnnotation.length > 2048)
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
      await new Promise(resolve => {
        yawas_storeHighlightsNow(qurl, title, webLabels, webAnnotation, googleSignature, function (res){
         if (res.ok)
         {
          yawas_setStatusIcon('on');
           var nannotations = webAnnotation.split(rightMark).length-1;
           chrome.action.setBadgeText({'text':''+nannotations});
           chrome.action.setTitle({title:'Yawas'});
           urls[qurl] = nannotations;
           cachedAnnotations[qurl] = webAnnotation;
           cb({addedhighlight:true,pureLen:pureLen});
         }
         else
         {
            yawas_setStatusIcon('error');
            cb(res);
         }
         resolve();
       });
      });
    }).catch(error => {
      yawas_setStatusIcon('error');
      cb({error: error && error.message ? error.message : '' + error});
    });
}

async function yawas_storeHighlightsNow(webUrl, title, labels, annotations, gooSignature, callback)
{
    if (saveLocally)
    {
      var keyName = purifyURL(webUrl).hashCode();
      var obj = {};
      obj[keyName] = {title:title,labels:labels,annotations:annotations};
      chrome.storage.sync.set(obj,function() {
      });
      callback({ok:true});
      return;
    }
    if (saveChromeBookmarks)
    {
      let url = purifyURL(webUrl)
      let obj = {url: url, title: title + '#__#' + annotations};
      await storeAnnotations(url, title, labels, annotations);
      let bookmark = await findYawasBookmarkByUrl(url)
      if (bookmark)
      {
        console.log('updating bookmark')
        await updateBookmark(bookmark.id,obj);
      } else {
        console.log('creating bookmark')
        await createBookmark(obj,new Date())
      }
      callback({ok:true});
      return;
    }


    if (gooSignature == null)
    {
        callback({error:'not signed in',signedout:true});
        return;
    }
    webUrl = purifyURL(webUrl);
    var xhr = new XMLHttpRequest();
    abortTimerId = window.setTimeout(function() {
      console.log('aborting yawas_storeHighlightsNow');
        xhr.abort();  // synchronously calls onreadystatechange
        callback({error:'timeout'});
    }, requestTimeout);

    var url = "https://www.google.com/bookmarks/mark?hl=en";
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onerror = function(error) {clearAbortTimer();}
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status  == 200)
            {
                clearAbortTimer();
                if (xhr.responseURL === url) {
                    //console.log('got what we wanted, hooray!');
                }
                else {
                    callback({error:'not signed in',signedout:true});
                    return;
                }

                var signin = xhr == null || xhr.responseText.indexOf('Sign in') != -1;
                if (signin)
                {
                    callback({error:'not signed in',signedout:true});
                }
                else
                {
                    callback({ok:true});
                }
            }
            else
            {
                clearAbortTimer();
            }

        }
    };
    var encoded = "sig=" + gooSignature;
    encoded += "&title=" + encodeURIComponent(title);
    encoded += "&bkmk=" + encodeURIComponent(webUrl);
    encoded += "&labels=" + encodeURIComponent(labels);
    encoded += "&annotation=" + encodeURIComponent(annotations);
    xhr.send(encoded);
}

function refreshBrowserAction(url)
{
    var qurl = purifyURL(url);
    if (urls[qurl] != undefined)
    {
        chrome.action.setBadgeText({'text':''+urls[qurl]});
    }
    else
        chrome.action.setBadgeText({'text':'0'});
    chrome.action.setTitle({title:'Yawas'});
}

function copyTextToClipboard(text) {
  sendMessageActiveTab({action:'yawas_copytoclipboard',payload: text})
}

let googleColors = [];
highlightColors.forEach(color => googleColors[color.id] = color.hex);
googleColors['white'] = 'transparent';

function yawas_copyclipboard(url,title, html = true)
{
    url = purifyURL(url);
    if (title.trim().length == 0)
        title = 'no title';
    var webAnnotation = cachedAnnotations[url];
    var highlights = annotationToArray(webAnnotation);
    if (html) {
      var body = '<a href="' + url + '">' + title + '</a><br>';
      for (var i=0;i<highlights.length;i++)
      {
        //if (highlights[i].comment)
        //  body += highlights[i].comment + ' ';
        //body += '<<' + highlights[i].selection + '>>\n';
        body += '<span style="background-color:' + googleColors[highlights[i].color] + '">' + highlights[i].selection + '</span><br>'
      }
      body += '<br>'
      copyTextToClipboard(body);

    } else {
      var body = title + '\n' + url + '\n';
      for (var i=0;i<highlights.length;i++)
      {
        if (highlights[i].comment)
          body += highlights[i].comment + ' ';
        body += '<<' + highlights[i].selection + '>>\n';
      }
      copyTextToClipboard(body);
    }
}

function yawas_email(url,title)
{
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
    /*var width = Math.min(screen.width-40,640);
    var height = Math.min(screen.height-40,480);
    var left = Math.floor( (screen.width - width) / 2);
    var top = Math.floor( (screen.height - height) / 2);
    window.open(compose,'email_popup','left='+left+',top='+top+',height='+height+'px,width='+width+'px,resizable=1');*/
    chrome.tabs.create({url:compose});
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
    if (!(annotations > ''))
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

/*async function startImport() {
  importAllBookmarks(function (n,error) {
    chrome.runtime.sendMessage({ msg: "importMessage", n: n, error: error });
  });
}*/

function requestCallback(request, sender, sendResponse)
{
  var tabURL = purifyURL(request.url);
  var tabTitle = request.title;
  //console.log('requestCallback',request);
  //if(request.msg == "startImportFunc")
  //  startImport();
  if (request.fn === 'yawas_getAnnotations')
  {
    yawas_getAnnotations(request.url,function(res){
      signedin = !res.error;
      sendResponse(res);
    });
  }
  /*else if (request.fn === 'yawas_donate')
  {
    chrome.tabs.create({ url: donate_url });
    sendResponse({});
  }*/
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
  else if (request.action == 'get_yawas_bookmark_data')
    getBookmarkData(request.url).then(({record, bookmark, url}) => {
      sendResponse({ok:true, url:url, record:record, bookmarkId: bookmark ? bookmark.id : null});
    });
  else if (request.action == 'save_yawas_bookmark_data')
    (async () => {
      let url = purifyURL(request.url);
      let title = request.title || '';
      let annotations = request.annotations || '';
      await storeAnnotations(url, title, '', annotations);
      let bookmark = await findYawasBookmarkByUrl(url);
      let obj = {url:url,title:title + '#__#' + annotations};
      if (bookmark)
      {
        await updateBookmark(bookmark.id,obj);
        sendResponse({ok:true});
      }
      else {
        await createBookmark(obj,new Date());
        sendResponse({ok:true});
      }
    })();

  // important: we want to use sendResponse asynchronously sometimes (e.g. fetching annotations using XHR)
  return true;

}

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
      if (!saveChromeBookmarks && webAnnotation.length > 2048)
        return cb({error:'too long',toobig:true});
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

/*chrome.contextMenus.create({
                           "id" : "donate",
                           "title" : "Donate💰",
                           "type" : "normal",
                           "contexts" : ["selection","page"],
                           "onclick" : getDonateHandler()
                         });*/

chrome.contextMenus.onClicked.addListener((info,tab) => {
  if (info.menuItemId === 'delete')
    sendMessageActiveTab({action:'yawas_delete_highlight'})
  else if (info.menuItemId === 'copyclipboard') {
    let url = isPDF(tab.url);
    let title = tab.title;
    yawas_copyclipboard(url,title);
  } else if (info.menuItemId === 'email') {
    let url = isPDF(tab.url);
    let title = tab.title;
    yawas_email(url,title);
  } else if (info.menuItemId === 'search')
    chrome.tabs.create({url:chrome.runtime.getURL('localsearch.html')});
  else if (info.menuItemId === 'edit') {
    let possiblePDFUrl = isPDF(info.pageUrl);
    chrome.tabs.create({url:chrome.runtime.getURL('localedit.html?url=' + encodeURIComponent(purifyURL(possiblePDFUrl)))});
  } else {
    let color = info.menuItemId;
    sendMessageActiveTab({action:'yawas_chrome',color:color,url:info.pageUrl});
  }
})

highlightColors.forEach(color => {
  chrome.contextMenus.create({
    "id" : color.id,
    "title" : color.title,
    "type" : "normal",
    "contexts" : ["selection"],
  });
});

chrome.contextMenus.create({
  "id" : "note",
  "title" : "Comment",// (Ctrl-Shift-C)",
  "type" : "normal",
  "contexts" : ["selection"],
});

chrome.contextMenus.create({
  "id" : "delete",
  "title" : "Delete",// (Ctrl-Shift-D)",
  "type" : "normal",
  "contexts" : ["selection"],
});

chrome.contextMenus.create({
  "id" : "copyclipboard",
  "title" : "Copy",
  "type" : "normal",
  "contexts" : ["page"],
});

chrome.contextMenus.create({
  "id" : "email",
  "title" : "Email",
  "type" : "normal",
  "contexts" : ["page"],
});

chrome.contextMenus.create({
  "id" : "search",
  "title" : "Search",
  "type" : "normal",
  "contexts" : ["page"],
});

chrome.contextMenus.create({
  "id" : "edit",
  "title" : "Edit",
  "type" : "normal",
  "contexts" : ["page"],
});

chrome.commands.onCommand.addListener(function(command) {
  if (command.indexOf('yawas-') === 0 && highlightColors.find(color => command === 'yawas-' + color.id))
    sendMessageActiveTab({action:'yawas_chrome',color:command.substring('yawas-'.length)});
  else if (command === 'yawas-delete')
    sendMessageActiveTab({action:'yawas_delete_highlight'});
  else if (command === 'yawas-comment')
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
