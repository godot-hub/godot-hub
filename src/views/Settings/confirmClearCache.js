const clearCache = require('../../helpers/Cache/clearCache');
const cacheReleases = require('../../helpers/Cache/cacheReleases');
const { app } = require('electron').remote;

// show a modal to confirm or cancel clearing cache
const confirmClearCache = (godotHubPath) => {
  const body = document.querySelector('body');

  // confirm clear Cache parent eleement
  const confirmClearCacheElementParent = document.createElement('section');
  confirmClearCacheElementParent.setAttribute('id', 'confirm-clear-cache-parent');
  body.prepend(confirmClearCacheElementParent);
  // confirm clear cache element
  const confirmClearCacheElement = document.createElement('section');
  confirmClearCacheElement.setAttribute('id', 'confirm-clear-cache-element');
  confirmClearCacheElementParent.appendChild(confirmClearCacheElement);
  // confirm clear cache header element
  const confirmClearCacheHeaderElement = document.createElement('h1');
  const confirmClearCacheHeaderElementText = document.createTextNode('Confirm clear cache');
  confirmClearCacheHeaderElement.appendChild(confirmClearCacheHeaderElementText);
  confirmClearCacheElement.appendChild(confirmClearCacheHeaderElement);
  // confirm clear cache body element
  const confirmClearCacheBodyElement = document.createElement('div');
  confirmClearCacheBodyElement.setAttribute('id', 'confirm-clear-cache-body');
  const confirmClearCacheBodyMessage = document.createElement('p');
  const confirmClearCacheBodyMessageText = document.createTextNode('Are you sure you want to clear godot hub cache?');
  confirmClearCacheBodyMessage.appendChild(confirmClearCacheBodyMessageText);
  confirmClearCacheBodyElement.appendChild(confirmClearCacheBodyMessage);
  confirmClearCacheElement.appendChild(confirmClearCacheBodyElement);
  // confirm clear cache buttons section
  const confirmClearCacheButtonsSection = document.createElement('section');
  confirmClearCacheButtonsSection.setAttribute('id', 'confirm-clear-cache-buttons');
  confirmClearCacheBodyElement.appendChild(confirmClearCacheButtonsSection);
  // cofirm clear cache button
  const confirmClearCacheButton = document.createElement('button');
  confirmClearCacheButton.setAttribute('id', 'confirm-clear-cache-button');
  const confirmClearCacheButtonText = document.createTextNode('Yes');
  confirmClearCacheButton.appendChild(confirmClearCacheButtonText);
  confirmClearCacheButtonsSection.appendChild(confirmClearCacheButton);

  // clear cache on confirm
  confirmClearCacheButton.addEventListener('click', () => {
    clearCache(godotHubPath);
    cacheReleases(godotHubPath);
    body.removeChild(confirmClearCacheElementParent);
  });

  // cancel clear cache button
  const cancelClearCacheButton = document.createElement('button');
  cancelClearCacheButton.setAttribute('id', 'cancel-clear-cache-button');
  const cancelClearCacheButtonText = document.createTextNode('Cancel');
  cancelClearCacheButton.appendChild(cancelClearCacheButtonText);
  confirmClearCacheButtonsSection.appendChild(cancelClearCacheButton);

  cancelClearCacheButton.addEventListener('click', () => {
    body.removeChild(confirmClearCacheElementParent);
  });
};

module.exports = confirmClearCache;
