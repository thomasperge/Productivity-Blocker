document.addEventListener('DOMContentLoaded', function () {
  const blockedSitesList = document.getElementById('blocked-sites');
  const blockButton = document.getElementById('block-button');
  const blockInput = document.getElementById('block-input');
  const successMessage = document.getElementById('success-message');
  const blockMessageButton = document.getElementById('block-message-button');
  const blockMessageInput = document.getElementById('block-message-input');
  const blockSocialMediaButton = document.getElementById('block-social-media-button');
  const blockEntertainmentButton = document.getElementById('block-entertainment-button');

  // ==> Load blocked sites from storage and display them
  chrome.storage.sync.get(['blockedSites'], function (result) {
    const blockedSites = result.blockedSites || [];
    if (blockedSites.length === 0) {
      blockedSitesList.innerHTML = '<p>Aucun site n\'a été bloqué.</p>';
    } else {
      blockedSitesList.innerHTML = '';
      blockedSites.forEach(site => addSiteToList(site));
    }
  });

  // ==> Add a site to the blocked sites list
  blockButton.addEventListener('click', function () {
    const site = blockInput.value.trim();
    if (site) {
      chrome.storage.sync.get(['blockedSites'], function (result) {
        const blockedSites = result.blockedSites || [];
        if (!blockedSites.includes(site)) {
          blockedSites.push(site);
          chrome.storage.sync.set({ blockedSites }, function () {
            addSiteToList(site);
            blockInput.value = '';
            showMessage(successMessage, 'Site ajouté avec succès !');
          });
        }
      });
    }
  });

  // ==> Add default block message
  blockMessageButton.addEventListener('click', function () {
    const message = blockMessageInput.value.trim();
    if (message) {
      chrome.storage.sync.set({ blockMessage: message }, function () {
        blockMessageInput.value = '';
        showMessage(successMessage, 'Message de blocage mis à jour !');
      });
    }
  });

  // ==> Add social media sites to the blocked sites list
  blockSocialMediaButton.addEventListener('click', function () {
    const socialMediaSites = [
      'https://www.facebook.com',
      'https://x.com',
      'https://www.instagram.com',
      'https://www.tiktok.com',
    ];

    chrome.storage.sync.get(['blockedSites'], function (result) {
      let blockedSites = result.blockedSites || [];
      socialMediaSites.forEach(site => {
        if (!blockedSites.includes(site)) {
          blockedSites.push(site);
        }
      });
      chrome.storage.sync.set({ blockedSites }, function () {
        blockedSitesList.innerHTML = '';
        blockedSites.forEach(site => addSiteToList(site));
        showMessage(successMessage, 'Sites de médias sociaux bloqués avec succès !');
      });
    });
  });

  // ==> Add entertainment sites to the blocked sites list
  blockEntertainmentButton.addEventListener('click', function () {
    const entertainmentSites = [
      'https://www.netflix.com',
      'https://www.youtube.com',
      'https://www.disneyplus.com',
      'https://www.primevideo.com',
    ];

    chrome.storage.sync.get(['blockedSites'], function (result) {
      let blockedSites = result.blockedSites || [];
      entertainmentSites.forEach(site => {
        if (!blockedSites.includes(site)) {
          blockedSites.push(site);
        }
      });
      chrome.storage.sync.set({ blockedSites }, function () {
        blockedSitesList.innerHTML = '';
        blockedSites.forEach(site => addSiteToList(site));
        showMessage(successMessage, 'Sites d\'entertainment bloqués avec succès !');
      });
    });
  });

  // ==> Add site to the list in the popup
  function addSiteToList(site) {
    const noSitesMessage = blockedSitesList.querySelector('p');
    if (noSitesMessage) {
      blockedSitesList.removeChild(noSitesMessage);
    }

    const li = document.createElement('li');

    const websiteutl = document.createElement('span')
    websiteutl.textContent = site
    // li.textContent = site;
    
    const removeBtn = document.createElement('span');
    removeBtn.textContent = '✕';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', function () {
      removeSite(site);
    });
    li.appendChild(websiteutl);
    li.appendChild(removeBtn);
    blockedSitesList.appendChild(li);
  }

  // ==> Remove site from the blocked sites list
  function removeSite(site) {
    chrome.storage.sync.get(['blockedSites'], function (result) {
      let blockedSites = result.blockedSites || [];
      blockedSites = blockedSites.filter(s => s !== site);
      chrome.storage.sync.set({ blockedSites }, function () {
        blockedSitesList.innerHTML = '';
        if (blockedSites.length === 0) {
          blockedSitesList.innerHTML = '<p>Aucun site n\'a été bloqué.</p>';
        } else {
          blockedSites.forEach(site => addSiteToList(site));
        }
      });
    });
  }

  // ==> Show message for a short duration
  function showMessage(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(() => {
      element.style.display = 'none';
    }, 2000);
  }
});
