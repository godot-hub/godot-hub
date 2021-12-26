const { ipcRenderer } = require('electron');
const body = document.querySelector('body');

// show a modal that lets the user decide to confirm or cancel closing godot hub app
const confirmCloseGodotHub = () => {
  const confirmCloseGodotHubElementParent = document.querySelector('#confirm-close-godot-hub-parent');

  // don't allow confirm close godot hub modal to duplicate
  if (!confirmCloseGodotHubElementParent) {
    // confirm close godot hub parent element
    const confirmCloseGodotHubElementParent = document.createElement('section');
    confirmCloseGodotHubElementParent.setAttribute('id', 'confirm-close-godot-hub-parent');
    body.prepend(confirmCloseGodotHubElementParent);
    // confirm close godot hub element
    const confirmCloseGodotHubElement = document.createElement('section');
    confirmCloseGodotHubElement.setAttribute('id', 'confirm-close-godot-hub-element');
    confirmCloseGodotHubElementParent.appendChild(confirmCloseGodotHubElement);
    // confirm close godot hub header element
    const confirmCloseGodotHubHeaderElement = document.createElement('h1');
    const confirmCloseGodotHubHeaderElementText = document.createTextNode('Confirm close godot hub');
    confirmCloseGodotHubHeaderElement.appendChild(confirmCloseGodotHubHeaderElementText);
    confirmCloseGodotHubElement.appendChild(confirmCloseGodotHubHeaderElement);
    // confirm close godot hub body element
    const confirmCloseGodotHubBodyElement = document.createElement('div');
    confirmCloseGodotHubBodyElement.setAttribute('id', 'confirm-close-godot-hub-body');
    const confirmCloseGodotHubBodyMessage = document.createElement('p');
    const confirmCloseGodotHubBodyMessageText = document.createTextNode('Are you sure you want to close godot hub?');
    confirmCloseGodotHubBodyMessage.appendChild(confirmCloseGodotHubBodyMessageText);
    confirmCloseGodotHubBodyElement.appendChild(confirmCloseGodotHubBodyMessage);
    confirmCloseGodotHubElement.appendChild(confirmCloseGodotHubBodyElement);
    // confirm close godot hub buttons section
    const confirmCloseGodotHubButtonsSection = document.createElement('section');
    confirmCloseGodotHubButtonsSection.setAttribute('id', 'confirm-close-godot-hub-buttons');
    confirmCloseGodotHubBodyElement.appendChild(confirmCloseGodotHubButtonsSection);
    // confirm close godot hub button
    const confirmCloseGodotHubButton = document.createElement('button');
    confirmCloseGodotHubButton.setAttribute('id', 'confirm-close-godot-hub-button');
    const confirmCloseGodotHubButtonText = document.createTextNode('Yes');
    confirmCloseGodotHubButton.appendChild(confirmCloseGodotHubButtonText);
    confirmCloseGodotHubButtonsSection.appendChild(confirmCloseGodotHubButton);

    // close godot hub on confirm
    confirmCloseGodotHubButton.addEventListener('click', () => {
      ipcRenderer.send('quit');
      body.removeChild(confirmCloseGodotHubElementParent);
    });

    // cancel close godot hub button
    const cancelCloseGodotHubButton = document.createElement('button');
    cancelCloseGodotHubButton.setAttribute('id', 'cancel-close-godot-hub-button');
    const cancelCloseGodotHubButtonText = document.createTextNode('Cancel');
    cancelCloseGodotHubButton.appendChild(cancelCloseGodotHubButtonText);
    confirmCloseGodotHubButtonsSection.appendChild(cancelCloseGodotHubButton);

    cancelCloseGodotHubButton.addEventListener('click', () => {
      body.removeChild(confirmCloseGodotHubElementParent);
    });
  }
};

module.exports = confirmCloseGodotHub;
