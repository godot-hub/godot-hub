const fs = require('fs');
const path = require('path');
const os = require('os');
const { ipcRenderer } = require('electron');

const back = document.querySelector('#back');

const confirmStopAllDownloads = require('./Download/confirmStopAllDownloads');

back.addEventListener('click', () => {
  // navigate back to main menu if there are no current downloads
  if (!Object.keys(sessionStorage).length) {
    ipcRenderer.send('navigate', { filePath: './src/views/Index/index.html' });
  } else {
    confirmStopAllDownloads();
  }
});

// godot hub path
const godotHubConfigPath = path.join(os.homedir(), '.godot-hub.json');
const godotHubPath = JSON.parse(fs.readFileSync(godotHubConfigPath)).godotHubPath;

// render installed releases as available releases in versions view
const renderVersions = require('./renderVersions');
renderVersions(godotHubPath, godotHubConfigPath);

// handle confirm close godot hub
const confirmCloseGodotHub = require('../../helpers/GodotHub/confirmCloseGodotHub');

ipcRenderer.on('should-quit', () => {
  confirmCloseGodotHub();
});
