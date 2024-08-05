// background.js

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['blockedSites', 'permanentBlockedSites'], function (result) {
        const blockedSites = result.blockedSites || [];
        const permanentBlockedSites = result.permanentBlockedSites || [];
        const currentUrl = new URL(details.url);

        const isBlocked = blockedSites.some(site => currentUrl.hostname.includes(site)) ||
          permanentBlockedSites.some(site => currentUrl.hostname.includes(site));

        console.log("Checking URL:", currentUrl.hostname);
        console.log("Blocked Sites:", blockedSites);
        console.log("Permanent Blocked Sites:", permanentBlockedSites);
        console.log("Is Blocked:", isBlocked);

        resolve({ cancel: isBlocked });
      });
    });
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

