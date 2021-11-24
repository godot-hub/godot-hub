const { ipcRenderer } = require('electron');

// show a warning and get confirmation from user to stop all downloads and navigate back to main menu
const confirmStopAllDownloads = () => {
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
      console.log(downloads);
      for (const download of downloads) {
        // exclude ending mono from download
        const downloadWithoutEndingMono = download.slice(0, download.lastIndexOf('-mono'));
        // extract version out of downlod name
        const version = download.includes('mono')
          ? `${downloadWithoutEndingMono.slice(downloadWithoutEndingMono.lastIndexOf('-') + 1)}-mono`
          : download.slice(download.lastIndexOf('-') + 1);

        console.log(download);
        console.log(downloadWithoutEndingMono);
        console.log(version);

        // stop download if its godot
        if (download.includes(`godot-${version}`)) {
          ipcRenderer.send(`getGodot-Stop-${version}`);
        }

        // stop download if its mono
        if (download.includes(`mono-${version}`)) {
          ipcRenderer.send(`getMono-Stop-${version}`);
        }

        // stop download if its export templates
        if (download.includes(`export-templates-${version}`)) {
          ipcRenderer.send(`getExportTemplates-Stop-${version}`);
        }

        // stop download if its mono export templates
        if (download.includes(`mono-export-templates-${version}`)) {
          ipcRenderer.send(`getMonoExportTemplates-Stop-${version}`);
        }

        sessionStorage.removeItem(download);
      }
    }
    ipcRenderer.send('navigate', { filePath: './src/views/Index/index.html' });
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
