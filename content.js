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
      document.body.innerHTML = '';
      document.body.style.backgroundColor = 'black';
      document.body.style.fontFamily = "'Roboto', sans-serif";

      const containerDiv = document.createElement('div');
      containerDiv.style.position = 'fixed';
      containerDiv.style.top = '50%';
      containerDiv.style.left = '50%';
      containerDiv.style.transform = 'translate(-50%, -50%)';
      containerDiv.style.color = 'white';
      containerDiv.style.textAlign = 'center';

      const reminderDiv = document.createElement('div');
      reminderDiv.style.fontSize = '24px';
      reminderDiv.style.marginBottom = '10px';
      reminderDiv.innerText = 'Reminder:';

      const messageDiv = document.createElement('div');
      messageDiv.style.fontSize = '20px';
      messageDiv.innerText = blockMessage;

      containerDiv.appendChild(reminderDiv);
      containerDiv.appendChild(messageDiv);

      document.body.appendChild(containerDiv);
    });
  }
});
