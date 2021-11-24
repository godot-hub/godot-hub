const uninstallVersion = require('./uninstallVersion');

// show a warning and get confirmation from user to delete version
const confirmUninstallVersion = (version, releasePath, godotHubPath, godotHubConfigPath) => {
  const body = document.querySelector('body');
  // confirm uninstall version parent eleement
  const confirmUninstallVersionElementParent = document.createElement('section');
  confirmUninstallVersionElementParent.setAttribute('id', 'confirm-uninstall-version-parent');
  body.prepend(confirmUninstallVersionElementParent);
  // confirm uninstall version element
  const confirmUninstallVersionElement = document.createElement('section');
  confirmUninstallVersionElement.setAttribute('id', 'confirm-uninstall-version-element');
  confirmUninstallVersionElementParent.appendChild(confirmUninstallVersionElement);
  // uninstall version header element
  const uninstallVersionHeaderElement = document.createElement('h1');
  const uninstallVersionHeaderElementText = document.createTextNode(`Uninstall Godot ${version}`);
  uninstallVersionHeaderElement.appendChild(uninstallVersionHeaderElementText);
  confirmUninstallVersionElement.appendChild(uninstallVersionHeaderElement);
  // uninstall version body element
  const uninstallVersionBodyElement = document.createElement('div');
  uninstallVersionBodyElement.setAttribute('id', 'uninstall-version-body');
  const uninstallVersionBodyMessage = document.createElement('p');
  const uninstallVersionBodyMessageText = document.createTextNode(`Are you sure you want to uninstall Godot ${version}?`);
  uninstallVersionBodyMessage.appendChild(uninstallVersionBodyMessageText);
  uninstallVersionBodyElement.appendChild(uninstallVersionBodyMessage);
  confirmUninstallVersionElement.appendChild(uninstallVersionBodyElement);
  // confirm uninstall buttons section
  const confirmUninstallButtonsSection = document.createElement('section');
  confirmUninstallButtonsSection.setAttribute('id', 'confirm-uninstall-buttons');
  uninstallVersionBodyElement.appendChild(confirmUninstallButtonsSection);
  // confirm uninstall button
  const confirmUninstallVersionButton = document.createElement('button');
  confirmUninstallVersionButton.setAttribute('id', 'confirm-uninstall-button');
  const confirmUninstallVersionButtonText = document.createTextNode('Yes');
  confirmUninstallVersionButton.appendChild(confirmUninstallVersionButtonText);
  confirmUninstallButtonsSection.appendChild(confirmUninstallVersionButton);

  confirmUninstallVersionButton.addEventListener('click', () => {
    uninstallVersion(releasePath, godotHubPath, godotHubConfigPath);
    body.removeChild(confirmUninstallVersionElementParent);
  });

  // cancel uninstall button
  const cancelUninstallVersionButton = document.createElement('button');
  cancelUninstallVersionButton.setAttribute('id', 'cancel-uninstall-button');
  const cancelUninstallVersionButtonText = document.createTextNode('Cancel');
  cancelUninstallVersionButton.appendChild(cancelUninstallVersionButtonText);
  confirmUninstallButtonsSection.appendChild(cancelUninstallVersionButton);

  cancelUninstallVersionButton.addEventListener('click', () => {
    body.removeChild(confirmUninstallVersionElementParent);
  });
};

module.exports = confirmUninstallVersion;
