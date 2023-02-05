import { OGPMetaParser } from "./MetaData"

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  const metas = document.getElementsByTagName("meta");
  const ogpmp = new OGPMetaParser(metas);
  ogpmp.build();
  sendResponse(ogpmp.to_json());
  return true;
});

