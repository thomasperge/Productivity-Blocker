// background.js

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ blockedSites: [] });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateBlockedSites') {
    chrome.storage.sync.set({ blockedSites: message.sites }, () => {
      sendResponse({ status: 'success' });
    });
    return true;  // Indique que la réponse sera envoyée de manière asynchrone
  }
});
