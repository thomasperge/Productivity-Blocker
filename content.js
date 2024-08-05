const quotes = "You need to work."

chrome.storage.sync.get(['blockedSites', 'permanentBlockedSites', 'blockMessage'], function (result) {
  const blockedSites = result.blockedSites || [];
  const permanentBlockedSites = result.permanentBlockedSites || [];
  const blockMessage = result.blockMessage || quotes[Math.floor(Math.random() * quotes.length)];
  const currentUrl = window.location.href;

  const isBlocked = blockedSites.some(site => currentUrl.includes(site)) ||
    permanentBlockedSites.some(site => currentUrl.includes(site));

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
