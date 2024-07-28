// content.js

chrome.storage.sync.get(['blockedSites'], function(result) {
  const blockedSites = result.blockedSites || [];
  const currentUrl = window.location.href;

  console.log('Blocked sites:', blockedSites); // Log the blocked sites

  const isBlocked = blockedSites.some(site => {
    // Vérifie si l'URL actuelle correspond au site bloqué
    return currentUrl.includes(site);
  });

  console.log(isBlocked);

  if (isBlocked) {
    document.body.innerHTML = ''; // Clear the current page content
    document.body.style.backgroundColor = 'black'; // Set background to black
    document.body.style.fontFamily = "'Roboto', sans-serif"; // Set font to Roboto

    const messageDiv = document.createElement('div');
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.color = 'white';
    messageDiv.style.fontSize = '24px';
    messageDiv.style.textAlign = 'center';
    messageDiv.innerText = 'Ce site est bloqué pour des raisons de productivité. Retournez au travail !';

    document.body.appendChild(messageDiv);
  }
});
