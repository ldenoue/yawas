let r = new URLSearchParams(window.location.search);
let docurl = r.get('url');

let saveButton = document.getElementById('save')

chrome.runtime.sendMessage({action:'get_yawas_bookmark_data', url:docurl}, res => {
  if (res && res.ok && res.record) {
    title.value = res.record.title || ''
    annotations.value = res.record.annotations || ''

    saveButton.addEventListener('click',(evt) => {
      evt.preventDefault()
      evt.stopPropagation()
      chrome.runtime.sendMessage({
        action:'save_yawas_bookmark_data',
        url:res.url,
        title:title.value.trim(),
        annotations:annotations.value.trim()
      }, () => {
        window.close();
      })
    })
  } else {
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
