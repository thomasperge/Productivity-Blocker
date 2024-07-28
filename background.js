// background.js

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['blockedSites'], function (result) {
        const blockedSites = result.blockedSites || [];
        const currentUrl = new URL(details.url);

        const isBlocked = blockedSites.some(site => currentUrl.hostname.includes(site));

        resolve({ cancel: isBlocked });
      });
    });
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
