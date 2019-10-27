function loadOptions() {
  chrome.storage.sync.get({
    /*handlePDF: false,*/
    saveLocally: false
  }, function(items) {
    //document.getElementById('handlePDF').checked = items.handlePDF;
    document.getElementById('saveLocally').checked = items.saveLocally;
  });
}

function saveOptions() {
  //var handlePDF = document.getElementById("handlePDF").checked;
  var saveLocally = document.getElementById("saveLocally").checked;
  chrome.storage.sync.set({
    /*handlePDF: handlePDF,*/
    saveLocally:saveLocally
  }, function() {
    //window.close();
  });
}

function restoreOptions() {
  chrome.storage.sync.set({
    /*handlePDF: false,*/
    saveLocally: false
  }, function() {
    //document.getElementById("handlePDF").checked = false;
    document.getElementById('saveLocally').checked = false;
  });
}

function donateOptions() {
    chrome.tabs.create({ url: 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=R9JRASMAABUUE&item_name=Yawas+Web+and+PDF+Highlighter&currency_code=USD&source=yawasextension' });
}

document.addEventListener('DOMContentLoaded', loadOptions);
//document.querySelector('#save').addEventListener('click', saveOptions);
document.querySelector('#restore').addEventListener('click', restoreOptions);
document.querySelector('#donate').addEventListener('click', donateOptions);

//let handlePDFElem = document.getElementById("handlePDF");
let saveLocallyElem = document.getElementById("saveLocally");
//handlePDFElem.addEventListener('change',saveOptions);
saveLocallyElem.addEventListener('change',saveOptions);
