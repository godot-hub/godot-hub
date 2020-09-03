const fs = require('fs');
const path = require('path');
const { ipcRenderer } = require('electron');

const back = document.querySelector('#back');

const confirmStopAllDownloads = require('./Download/confirmStopAllDownloads');

back.addEventListener('click', () => {
  // navigate back to main menu if there are no current downloads
  if (!Object.keys(sessionStorage).length) {
    ipcRenderer.send('navigate', { filePath: './src/components/Index/index.html' });
  } else {
    confirmStopAllDownloads();
  }
});

// godot hub path
const godotHubConfigPath = path.join(process.cwd(), 'godot-hub.json');
const godotHubPath = JSON.parse(fs.readFileSync(godotHubConfigPath)).godotHubPath;

// render installed releases as available releases in versions view
const renderVersions = require('./renderVersions');
renderVersions(godotHubPath, godotHubConfigPath);
