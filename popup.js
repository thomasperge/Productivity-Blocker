document.addEventListener('DOMContentLoaded', function () {
  const blockedSitesList = document.getElementById('blocked-sites');
  const permanentBlockedSitesList = document.getElementById('permanent-blocked-sites');
  const showMoreBlockedButton = document.getElementById('show-more-blocked');
  const showMorePermanentButton = document.getElementById('show-more-permanent');
  const blockButton = document.getElementById('block-button');
  const blockInput = document.getElementById('block-input');
  const successMessage = document.getElementById('success-message');
  const blockMessageButton = document.getElementById('block-message-button');
  const blockMessageInput = document.getElementById('block-message-input');
  const blockSocialMediaButton = document.getElementById('block-social-media-button');
  const blockEntertainmentButton = document.getElementById('block-entertainment-button');

  let blockedSites = [];
  let permanentBlockedSites = [];
  let isShowingAllBlocked = false;
  let isShowingAllPermanent = false;

  // ==> Load blocked sites from storage and display them
  chrome.storage.sync.get(['blockedSites', 'permanentBlockedSites'], function (result) {
    blockedSites = result.blockedSites || [];
    permanentBlockedSites = result.permanentBlockedSites || [];

    displaySites();
  });

  // ==> Display sites
  function displaySites() {
    // Display blocked sites
    blockedSitesList.innerHTML = '';
    if (blockedSites.length === 0) {
      blockedSitesList.innerHTML = '<p>Aucun site bloqué.</p>';
      showMoreBlockedButton.style.display = 'none';
    } else {
      const blockedSitesToShow = isShowingAllBlocked ? blockedSites : blockedSites.slice(0, 4);
      blockedSitesToShow.forEach(site => addSiteToList(site, false));
      showMoreBlockedButton.style.display = blockedSites.length > 5 ? 'block' : 'none';
    }

    // Display permanent blocked sites
    permanentBlockedSitesList.innerHTML = '';
    if (permanentBlockedSites.length === 0) {
      permanentBlockedSitesList.innerHTML = '<p>Aucun site bloqué à vie.</p>';
      showMorePermanentButton.style.display = 'none';
    } else {
      const permanentSitesToShow = isShowingAllPermanent ? permanentBlockedSites : permanentBlockedSites.slice(0, 4);
      permanentSitesToShow.forEach(site => addSiteToList(site, true));
      showMorePermanentButton.style.display = permanentBlockedSites.length > 5 ? 'block' : 'none';
    }
  }

  // ==> Add a site to the list in the popup
  function addSiteToList(site, isPermanent = false) {
    const list = isPermanent ? permanentBlockedSitesList : blockedSitesList;
    const noSitesMessage = list.querySelector('p');
    if (noSitesMessage) {
      list.removeChild(noSitesMessage);
    }

    const li = document.createElement('li');
    const websiteutl = document.createElement('span')
    websiteutl.textContent = site;

    const buttonContainer = document.createElement('span')
    buttonContainer.classList.add('buttonContainer')

    if (!isPermanent) {
      const removeBtn = document.createElement('span');
      removeBtn.textContent = '✕';
      removeBtn.classList.add('remove-btn');
      removeBtn.addEventListener('click', function () {
        removeSite(site);
      });

      const permanentBtn = document.createElement('span');
      permanentBtn.textContent = '🔒';
      permanentBtn.classList.add('permanent-btn');
      permanentBtn.addEventListener('click', function () {
        makeSitePermanent(site);
      });

      buttonContainer.appendChild(removeBtn);
      buttonContainer.appendChild(permanentBtn);
    }

    li.appendChild(websiteutl);
    li.appendChild(buttonContainer);
    list.appendChild(li);
  }

  // ==> Add a site to the blocked sites list
  blockButton.addEventListener('click', function () {
    const site = blockInput.value.trim();
    if (site) {
      chrome.storage.sync.get(['blockedSites', 'permanentBlockedSites'], function (result) {
        blockedSites = result.blockedSites || [];
        permanentBlockedSites = result.permanentBlockedSites || [];
        if (!blockedSites.includes(site) && !permanentBlockedSites.includes(site)) {
          blockedSites.push(site);
          chrome.storage.sync.set({ blockedSites }, function () {
            blockInput.value = '';
            displaySites();
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
      'https://www.discord.com',
    ];

    chrome.storage.sync.get(['blockedSites', 'permanentBlockedSites'], function (result) {
      blockedSites = result.blockedSites || [];
      permanentBlockedSites = result.permanentBlockedSites || [];
      socialMediaSites.forEach(site => {
        if (!blockedSites.includes(site) && !permanentBlockedSites.includes(site)) {
          blockedSites.push(site);
        }
      });
      chrome.storage.sync.set({ blockedSites }, function () {
        displaySites();
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

    chrome.storage.sync.get(['blockedSites', 'permanentBlockedSites'], function (result) {
      blockedSites = result.blockedSites || [];
      permanentBlockedSites = result.permanentBlockedSites || [];
      entertainmentSites.forEach(site => {
        if (!blockedSites.includes(site) && !permanentBlockedSites.includes(site)) {
          blockedSites.push(site);
        }
      });
      chrome.storage.sync.set({ blockedSites }, function () {
        displaySites();
        showMessage(successMessage, 'Sites d\'entertainment bloqués avec succès !');
      });
    });
  });

  // ==> Remove site from the blocked sites list
  function removeSite(site) {
    chrome.storage.sync.get(['blockedSites'], function (result) {
      blockedSites = result.blockedSites || [];
      blockedSites = blockedSites.filter(s => s !== site);
      chrome.storage.sync.set({ blockedSites }, function () {
        displaySites();
        showMessage(successMessage, 'Site supprimée !');
      });
    });
  }

  // ==> Make site permanent in the blocked sites list
  function makeSitePermanent(site) {
    chrome.storage.sync.get(['blockedSites', 'permanentBlockedSites'], function (result) {
      blockedSites = result.blockedSites || [];
      permanentBlockedSites = result.permanentBlockedSites || [];
      blockedSites = blockedSites.filter(s => s !== site);
      if (!permanentBlockedSites.includes(site)) {
        permanentBlockedSites.push(site);
      }
      chrome.storage.sync.set({ blockedSites, permanentBlockedSites }, function () {
        displaySites();
        showMessage(successMessage, 'Site bloqué à vie avec succès !');
      });
    });
  }

  // ==> Show More for blocked sites
  showMoreBlockedButton.addEventListener('click', function () {
    isShowingAllBlocked = !isShowingAllBlocked;
    showMoreBlockedButton.textContent = isShowingAllBlocked ? 'Show Less' : 'Show More';
    displaySites();
  });

  // ==> Show More for permanent blocked sites
  showMorePermanentButton.addEventListener('click', function () {
    isShowingAllPermanent = !isShowingAllPermanent;
    showMorePermanentButton.textContent = isShowingAllPermanent ? 'Show Less' : 'Show More';
    displaySites();
  });

  // ==> Show message for a short duration
  function showMessage(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(() => {
      element.style.display = 'none';
    }, 2000);
  }
});
