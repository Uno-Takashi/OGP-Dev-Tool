import { toJSON } from '../infrastructure/parsers/OGPMetadataParser';

chrome.runtime.onMessage.addListener((_msg, _sender, sendResponse) => {
  const metas = document.querySelectorAll('meta');
  sendResponse(toJSON(metas));
  return true;
});
