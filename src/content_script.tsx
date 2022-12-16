chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log(sender);
  const metas = document.getElementsByTagName("meta");
  sendResponse({ meta: metas[0], });
  return true;
});

