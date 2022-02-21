/*function loadOptions() {
  chrome.storage.sync.get({
    saveLocally: false,
    saveChromeBookmarks: true
  }, function(items) {
    //document.getElementById('handlePDF').checked = items.handlePDF;
    document.getElementById('saveLocally').checked = items.saveLocally;
    document.getElementById('saveChromeBookmarks').checked = items.saveChromeBookmarks;
  });
}

function saveOptions() {
  var saveLocally = document.getElementById("saveLocally").checked;
  var saveChromeBookmarks = document.getElementById("saveChromeBookmarks").checked;
  chrome.storage.sync.set({
    saveLocally:saveLocally,
    saveChromeBookmarks:saveChromeBookmarks
  }, function() {
    //window.close();
  });
}

function restoreOptions() {
  chrome.storage.sync.set({
    saveLocally: false,
    saveChromeBookmarks: true
  }, function() {
    //document.getElementById("handlePDF").checked = false;
    document.getElementById('saveLocally').checked = false;
    document.getElementById('saveChromeBookmarks').checked = true;
  });
}*/

/*function donateOptions() {
    chrome.tabs.create({ url: 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=R9JRASMAABUUE&item_name=Yawas+Web+and+PDF+Highlighter&currency_code=USD&source=yawasextension' });
}*/

//document.addEventListener('DOMContentLoaded', loadOptions);
//document.querySelector('#save').addEventListener('click', saveOptions);
//document.querySelector('#restore').addEventListener('click', restoreOptions);
//document.querySelector('#donate').addEventListener('click', donateOptions);

//let handlePDFElem = document.getElementById("handlePDF");
//handlePDFElem.addEventListener('change',saveOptions);
//let saveLocallyElem = document.getElementById("saveLocally");
//saveLocallyElem.addEventListener('change',saveOptions);
//let saveChromeBookmarksElem = document.getElementById("saveChromeBookmarks");
//saveChromeBookmarksElem.addEventListener('change',saveOptions);

let importButton = document.getElementById('importChromeBookmarks');
importButton.addEventListener('click', () => {
  importButton.textContent = 'Importing'
  importButton.disabled = true
chrome.runtime.sendMessage({ msg: "startImportFunc" })
});

let searchButton = document.getElementById('searchChromeBookmarks');
searchButton.addEventListener('click', () => {
  chrome.tabs.create({url:chrome.extension.getURL('localsearch.html')})
  window.close()
});

chrome.runtime.onMessage.addListener(async function requestCallback(request, sender, sendResponse) {
  if (request.msg === 'importMessage') {
    if (request.error) {
      importmessage.textContent = request.error
      importButton.textContent = 'Import'
      importButton.disabled = false
    }
    else {
      importmessage.textContent = `imported ${request.n} bookmarks`;
      request.start ? importButton.disabled = true : importButton.disabled = false
    }
  }
});

