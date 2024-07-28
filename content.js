// content.js

const quotes = [
  "Le succès, c'est se promener d'échecs en échecs tout en restant motivé. - Winston Churchill",
  "Ne laissez pas le bruit des opinions des autres étouffer votre propre voix intérieure. - Steve Jobs",
  "La meilleure façon de prédire l'avenir est de le créer. - Peter Drucker",
  "Ne crains pas d'avancer lentement, crains seulement de t'arrêter. - Proverbe chinois",
  "La seule limite à notre épanouissement de demain sera nos doutes d'aujourd'hui. - Franklin D. Roosevelt"
];

chrome.storage.sync.get(['blockedSites', 'blockMessage'], function (result) {
  const blockedSites = result.blockedSites || [];
  const blockMessage = result.blockMessage || quotes[Math.floor(Math.random() * quotes.length)];
  const currentUrl = window.location.href;

  const isBlocked = blockedSites.some(site => currentUrl.includes(site));

  if (isBlocked) {
    document.addEventListener("DOMContentLoaded", function () {
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
      messageDiv.innerText = blockMessage;

      document.body.appendChild(messageDiv);
    });
  }
});
