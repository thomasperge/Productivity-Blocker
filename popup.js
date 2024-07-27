// popup.js

document.getElementById('blockButton').addEventListener('click', function () {
  const siteInput = document.getElementById('siteInput').value;
  let site = siteInput.trim();
  if (site) {
    // Remove 'http://' or 'https://' from the URL if present
    site = site.replace(/^https?:\/\//, '');
    // Remove trailing slash if present
    site = site.replace(/\/$/, '');

    chrome.storage.sync.get(['blockedSites'], function (result) {
      const blockedSites = result.blockedSites || [];
      if (!blockedSites.includes(site)) {
        blockedSites.push(site);
        chrome.storage.sync.set({ blockedSites: blockedSites }, function () {
          alert('Site blocked: ' + site);
        });
      } else {
        alert('Site is already blocked');
      }
    });
  }
});
