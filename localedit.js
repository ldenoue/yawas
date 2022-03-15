let r = new URLSearchParams(window.location.search);
let docurl = r.get('url');

let item = null;
let error = false
let saveButton = document.getElementById('save')
chrome.bookmarks.search({url:docurl},res => {
  if (res && res[0]) {
    item = res[0]
    let chunks = item.title.split('#__#')
    title.value = chunks[0]
    annotations.value = chunks[1]

    saveButton.addEventListener('click',(evt) => {
      evt.preventDefault()
      evt.stopPropagation()
      let newtitle = title.value.trim() + '#__#' + annotations.value.trim()
      chrome.bookmarks.update(item.id,{title:newtitle}, res => {
        window.close();
      });
    })
    
  } else {
    error = true
    document.getElementById('error').textContent = "No bookmark for this page"
    saveButton.textContent = 'close'
    title.disabled = true
    annotations.disabled = true
    saveButton.addEventListener('click',(evt) => {
      evt.preventDefault()
      evt.stopPropagation()
      window.close();
    })
    
  }
})
