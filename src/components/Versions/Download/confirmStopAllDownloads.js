const { ipcRenderer } = require('electron');

// show a warning and get confirmation from user to stop all downloads and navigate back to main menu
const confirmStopAllDownloads = (e, type) => {
  const body = document.querySelector('body');
  // confirm stop all downloads parent eleement
  const confirmStopAllDownloadsElementParent = document.createElement('section');
  confirmStopAllDownloadsElementParent.setAttribute('id', 'confirm-stop-all-downloads-parent');
  body.prepend(confirmStopAllDownloadsElementParent);
  // confirm stop all downloads element
  const confirmStopAllDownloadsElement = document.createElement('section');
  confirmStopAllDownloadsElement.setAttribute('id', 'confirm-stop-all-downloads-element');
  confirmStopAllDownloadsElementParent.appendChild(confirmStopAllDownloadsElement);
  // stop all downloads header element
  const stopAllDownloadsHeaderElement = document.createElement('h1');
  const stopAllDownloadsHeaderElementText = document.createTextNode('Stop All Current Downloads');
  stopAllDownloadsHeaderElement.appendChild(stopAllDownloadsHeaderElementText);
  confirmStopAllDownloadsElement.appendChild(stopAllDownloadsHeaderElement);
  // stop all downloads body element
  const stopAllDownloadsBodyElement = document.createElement('div');
  stopAllDownloadsBodyElement.setAttribute('id', 'stop-all-downloads-body');
  const stopAllDownloadsBodyMessage = document.createElement('p');
  const stopAllDownloadsBodyMessageText = document.createTextNode('Are you sure you want to go back to main menu?');
  const stopAllDownloadsBodyMessageDescription = document.createElement('p');
  const stopAllDownloadsBodyMessageDescriptionText = document.createTextNode('doing so will stop all current downloads');
  stopAllDownloadsBodyMessage.appendChild(stopAllDownloadsBodyMessageText);
  stopAllDownloadsBodyElement.appendChild(stopAllDownloadsBodyMessage);
  stopAllDownloadsBodyMessageDescription.appendChild(stopAllDownloadsBodyMessageDescriptionText);
  stopAllDownloadsBodyElement.appendChild(stopAllDownloadsBodyMessageDescription);
  confirmStopAllDownloadsElement.appendChild(stopAllDownloadsBodyElement);
  // stop all downloads buttons section
  const confirmStopAllDownloadsButtonsSection = document.createElement('section');
  confirmStopAllDownloadsButtonsSection.setAttribute('id', 'confirm-stop-all-downloads-buttons');
  stopAllDownloadsBodyElement.appendChild(confirmStopAllDownloadsButtonsSection);
  // stop all downloads button
  const confirmStopAllDownloadsButton = document.createElement('button');
  confirmStopAllDownloadsButton.setAttribute('id', 'confirm-stop-all-downloads-button');
  const confirmStopAllDownloadsButtonText = document.createTextNode('Yes');
  confirmStopAllDownloadsButton.appendChild(confirmStopAllDownloadsButtonText);
  confirmStopAllDownloadsButtonsSection.appendChild(confirmStopAllDownloadsButton);

  // stop all downloads on confirm
  confirmStopAllDownloadsButton.addEventListener('click', () => {
    if (Object.keys(sessionStorage).length) {
      const downloads = Object.keys(sessionStorage);
      for (let download of downloads) {
        // extract version out of downlod name
        const version = download.slice(download.lastIndexOf('-') + 1);

        // stop download based on download type
        if (download.includes('godot')) {
          ipcRenderer.send(`getGodot-Stop-${version}`);
        } else if (download.includes('mono')) {
          ipcRenderer.send(`getMono-Stop-${version}`);
        } else if (download.includes('export-templates')) {
          ipcRenderer.send(`getExportTemplates-Stop-${version}`);
        } else if (download.includes('mono-export-templates')) {
          ipcRenderer.send(`getMonoExportTemplates-Stop-${version}`);
        }

        sessionStorage.removeItem(download);
      }
    }
    ipcRenderer.send('navigate', { filePath: './src/components/Index/index.html' });
  });

  // cancel stop all downloads button
  const cancelStopAllDownloadsButton = document.createElement('button');
  cancelStopAllDownloadsButton.setAttribute('id', 'cancel-stop-all-downloads-button');
  const cancelStopAllDownloadsButtonText = document.createTextNode('Cancel');
  cancelStopAllDownloadsButton.appendChild(cancelStopAllDownloadsButtonText);
  confirmStopAllDownloadsButtonsSection.appendChild(cancelStopAllDownloadsButton);

  cancelStopAllDownloadsButton.addEventListener('click', () => {
    body.removeChild(confirmStopAllDownloadsElementParent);
  });
};

module.exports = confirmStopAllDownloads;
