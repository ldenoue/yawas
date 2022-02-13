let r = new URLSearchParams(window.location.search);
let docurl = r.get('url');

let item = null;
chrome.bookmarks.search({url:docurl},res => {
  if (res && res[0]) {
    item = res[0]
    let chunks = item.title.split('#__#')
    title.value = chunks[0]
    annotations.value = chunks[1]
  }
})

document.getElementById('save').addEventListener('click',(evt) => {
  evt.preventDefault()
  evt.stopPropagation()
  let newtitle = title.value.trim() + '#__#' + annotations.value.trim()
  chrome.bookmarks.update(item.id,{title:newtitle}, res => {
    window.close();
  });
})
