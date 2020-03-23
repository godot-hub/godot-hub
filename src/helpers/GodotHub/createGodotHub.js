const path = require('path');
const fs = require('fs');
const initGodotHubDir = require('../Init/initGodotHubDir');
const initCacheDir = require('../Init/initCacheDir');
const initConfigDir = require('../Init/initConfigDir');
const initReleasesDir = require('../Init/initReleasesDir');
const initGodotHubConfig = require('../Init/initGodotHubConfig');
const { ipcRenderer } = require('electron');

// create godot hub directory based on path provided
const createGodotHub = (createGodotHubPath) => {
  // path to check if there is already a godot hub directory
  const godotHubPath = path.join(createGodotHubPath, 'Godot-Hub');

  if (!fs.existsSync(godotHubPath)) {
    initGodotHubDir(createGodotHubPath);
    initCacheDir(godotHubPath);
    initConfigDir(godotHubPath);
    initReleasesDir(godotHubPath);
    initGodotHubConfig(godotHubPath);
    ipcRenderer.send('navigate', { filePath: './src/components/Index/index.html' });
  }
};

module.exports = createGodotHub;
