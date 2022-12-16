chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  const metas = document.getElementsByTagName("meta");
  sendResponse(metas);
});

