// background.js

function updateBlockedSites() {
  chrome.storage.sync.get(['blockedSites'], function(result) {
    const blockedSites = result.blockedSites || [];
    const urls = blockedSites.map(site => `*://${site}/*`);
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1],
      addRules: [{
        id: 1,
        priority: 1,
        action: { type: 'block' },
        condition: { urlFilter: '*', domains: urls }
      }]
    });
  });
}

// Initial load of blocked sites
updateBlockedSites();

// Listen for changes to the blocked sites list
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.blockedSites) {
    updateBlockedSites();
  }
});
