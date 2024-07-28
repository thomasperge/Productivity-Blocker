// popup.js

document.addEventListener('DOMContentLoaded', function() {
  const siteInput = document.getElementById('siteInput');
  const blockButton = document.getElementById('blockButton');
  const blockedSitesList = document.getElementById('blockedSitesList');

  blockButton.addEventListener('click', function() {
    const site = siteInput.value.trim();
    if (site) {
      let formattedSite = site.replace(/^https?:\/\//, '');
      formattedSite = formattedSite.replace(/\/.*$/, '');  // Remove path, keep hostname only

      chrome.storage.sync.get(['blockedSites'], function(result) {
        const blockedSites = result.blockedSites || [];
        if (!blockedSites.includes(formattedSite)) {
          blockedSites.push(formattedSite);
          chrome.storage.sync.set({ blockedSites: blockedSites }, function() {
            siteInput.value = '';
            displayBlockedSites();
            alert('Site blocked: ' + formattedSite);
          });
        } else {
          alert('The site is already blocked.');
        }
      });
    }
  });

  function displayBlockedSites() {
    chrome.storage.sync.get(['blockedSites'], function(result) {
      const blockedSites = result.blockedSites || [];
      blockedSitesList.innerHTML = '';
      blockedSites.forEach(site => {
        const li = document.createElement('li');
        li.textContent = site;
        const removeBtn = document.createElement('span');
        removeBtn.textContent = 'x';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', function() {
          removeBlockedSite(site);
        });
        li.appendChild(removeBtn);
        blockedSitesList.appendChild(li);
      });
    });
  }

  function removeBlockedSite(site) {
    chrome.storage.sync.get(['blockedSites'], function(result) {
      let blockedSites = result.blockedSites || [];
      blockedSites = blockedSites.filter(s => s !== site);
      chrome.storage.sync.set({ blockedSites: blockedSites }, function() {
        displayBlockedSites();
      });
    });
  }

  displayBlockedSites();
});
