// background.js

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    return { cancel: true };
  },
  { urls: ["*://*.youtube.com/*", "*://*.instagram.com/*"] },
  ["blocking"]
);
