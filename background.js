chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  if (req.todo === "showPageAction")
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.pageAction.show(tabs[0].id);
      chrome.pageAction.setPopup({ tabId: tabs[0].id, popup: "popup.html" });
    });
});
