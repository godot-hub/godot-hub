const stopMonoDownload = require('./stopMonoDownload');
const stopGodotDownload = require('./stopGodotDownload');
const stopMonoExportTemplatesDownload = require('./stopMonoExportTemplatesDownload');
const stopExportTemplatesDownload = require('./stopExportTemplatesDownload');

// show a warning and get confirmation from user to stop download
const confirmStopDownloadVersion = (e, type) => {
  const body = document.querySelector('body');
  // confirm stop download version parent eleement
  const confirmStopDownloadVersionElementParent = document.createElement('section');
  confirmStopDownloadVersionElementParent.setAttribute('id', 'confirm-stop-download-version-parent');
  body.prepend(confirmStopDownloadVersionElementParent);
  // confirm stop download version element
  const confirmStopDownloadVersionElement = document.createElement('section');
  confirmStopDownloadVersionElement.setAttribute('id', 'confirm-stop-download-version-element');
  confirmStopDownloadVersionElementParent.appendChild(confirmStopDownloadVersionElement);
  // stop download version header element
  const stopDownloadVersionHeaderElement = document.createElement('h1');
  const stopDownloadVersionHeaderElementText = document.createTextNode('Stop Download');
  stopDownloadVersionHeaderElement.appendChild(stopDownloadVersionHeaderElementText);
  confirmStopDownloadVersionElement.appendChild(stopDownloadVersionHeaderElement);
  // stop download version body element
  const stopDownloadVersionBodyElement = document.createElement('div');
  stopDownloadVersionBodyElement.setAttribute('id', 'stop-download-version-body');
  const stopDownloadVersionBodyMessage = document.createElement('p');
  const stopDownloadVersionBodyMessageText = document.createTextNode('Are you sure you want to stop the download?');
  stopDownloadVersionBodyMessage.appendChild(stopDownloadVersionBodyMessageText);
  stopDownloadVersionBodyElement.appendChild(stopDownloadVersionBodyMessage);
  confirmStopDownloadVersionElement.appendChild(stopDownloadVersionBodyElement);
  // confirm stop download buttons section
  const confirmStopDownloadButtonsSection = document.createElement('section');
  confirmStopDownloadButtonsSection.setAttribute('id', 'confirm-stop-download-buttons');
  stopDownloadVersionBodyElement.appendChild(confirmStopDownloadButtonsSection);
  // confirm stop download button
  const confirmStopDownloadVersionButton = document.createElement('button');
  confirmStopDownloadVersionButton.setAttribute('id', 'confirm-stop-download-button');
  const confirmStopDownloadVersionButtonText = document.createTextNode('Yes');
  confirmStopDownloadVersionButton.appendChild(confirmStopDownloadVersionButtonText);
  confirmStopDownloadButtonsSection.appendChild(confirmStopDownloadVersionButton);

  confirmStopDownloadVersionButton.addEventListener('click', () => {
    switch (type) {
      case 'mono':
        stopMonoDownload(e);
        break;
      case 'godot':
        stopGodotDownload(e);
        break;
      case 'mono-export-templates':
        stopMonoExportTemplatesDownload(e);
        break;
      case 'export-templates':
        stopExportTemplatesDownload(e);
        break;
      default:
        break;
    }
    body.removeChild(confirmStopDownloadVersionElementParent);
    return true;
  });

  // cancel stop download button
  const cancelStopDownloadVersionButton = document.createElement('button');
  cancelStopDownloadVersionButton.setAttribute('id', 'cancel-stop-download-button');
  const cancelStopDownloadVersionButtonText = document.createTextNode('Cancel');
  cancelStopDownloadVersionButton.appendChild(cancelStopDownloadVersionButtonText);
  confirmStopDownloadButtonsSection.appendChild(cancelStopDownloadVersionButton);

  cancelStopDownloadVersionButton.addEventListener('click', () => {
    body.removeChild(confirmStopDownloadVersionElementParent);
    return false;
  });
};

module.exports = confirmStopDownloadVersion;
