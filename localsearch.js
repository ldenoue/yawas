let all = []

const leftMark = '<<';//'&ldquo;'
const rightMark = '>>';//'&rdquo;'
const lenQuote = rightMark.length;

function annotationToArray(annotations)
{
    if (!annotations)
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

function domain(url) {
  return new URL(url).hostname
}

function splitTitleAndAnnotations(title) {
  let chunks = (title || '').split('#__#')
  return {
    title: chunks[0] || '',
    annotations: chunks.length > 1 ? chunks.slice(1).join('#__#') : '',
  }
}

function normalizeItem(item) {
  let parsed = splitTitleAndAnnotations(item.title)
  return {
    displayTitle: parsed.title,
    displayAnnotations: item.annotations !== undefined ? item.annotations : parsed.annotations,
    title: (parsed.title || '').toLowerCase(),
    url: (item.url || '').toLowerCase(),
    rawUrl: item.url || '',
    dateAdded: item.dateAdded || item.updatedAt || Date.now(),
  }
}

function loadSearchIndex() {
  chrome.storage.local.get(null, stored => {
    let merged = {}
    chrome.bookmarks.search({}, res => {
      for (let item of res) {
        if (item.url > '') {
          merged[item.url] = normalizeItem(item)
        }
      }

      for (let key in stored) {
        let item = stored[key]
        if (item && item.url) {
          let mergedItem = merged[item.url] || normalizeItem({url:item.url,title:item.title || '',dateAdded:item.createdAt || item.updatedAt})
          mergedItem.displayTitle = item.title || mergedItem.displayTitle
          mergedItem.displayAnnotations = item.annotations || mergedItem.displayAnnotations
          mergedItem.title = (mergedItem.displayTitle || '').toLowerCase()
          mergedItem.url = item.url.toLowerCase()
          mergedItem.rawUrl = item.url
          mergedItem.dateAdded = item.updatedAt || item.createdAt || mergedItem.dateAdded
          merged[item.url] = mergedItem
        }
      }

      all = Object.values(merged)
      all.sort((a,b) => b.dateAdded - a.dateAdded)
      results.innerHTML = '<p>search your yawas bookmarks by title, url, highlights and notes (' + all.length + ' urls)</p>'
    })
  })
}

function bold(text,query) {
  if (query > '')
    return text.replaceAll(query,'<b>' + query + '</b>')
  else
    return text;
}
function search(q) {
  let res = []
  for (let item of all) {
    if (item.url.indexOf(q) !== -1 || item.title.indexOf(q) !== -1)
      res.push(item)
  }
  results.innerHTML = '<p>' + res.length + ' results</p>'
  for (let item of res) {
    let hit = document.createElement('div')
    let title = item.displayTitle
    let date = new Date(item.dateAdded).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})
    let highlights = annotationToArray(item.displayAnnotations);
    let html = []
    for (let h of highlights) {
      if (h.selection.indexOf(q) !== -1)
        html.push(`<span>${bold(h.selection,q)}</span>`)
      else
      html.push(`<span>${h.selection}</span>`)
    }
    html = html.join('...')
    hit.innerHTML = `<div class='res'><div class='title'><a href="${item.rawUrl}">${bold(title,q)}</a></div><div><a href="${item.rawUrl}">${domain(item.rawUrl)}</a> - ${date}</div><div>${html}</div>`
    results.appendChild(hit)
  }
}

/*document.getElementById('close').addEventListener('click',(evt) => {
  evt.preventDefault()
  evt.stopPropagation()
  window.close();
})*/

document.getElementById('form').onsubmit = (evt) => {
  evt.preventDefault()
  evt.stopPropagation()
  if (query.value.trim() > '')
    search(query.value.trim().toLowerCase());
}

loadSearchIndex()
