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

function save(e)
{
    var obj = {};
    obj[keyName] = {title:title.value.trim(),labels:labels.value.trim(),annotations:annotations.value.trim()};
    chrome.storage.sync.set(obj,function() {
      window.close();
    });
}

let r = new URLSearchParams(window.location.search);
let docurl = r.get('url');
var keyName = docurl.hashCode();
var obj = {};
obj[keyName] = null;

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#save').addEventListener('click', save);
    chrome.storage.sync.get(obj,function(items) {
      if (items[keyName])
      {
        title.value = items[keyName].title;
        labels.value = items[keyName].labels;
        annotations.value = items[keyName].annotations;
      }
    });
});

