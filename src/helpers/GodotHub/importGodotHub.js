const path = require('path');
const fs = require('fs');
const initGodotHubConfig = require('../Init/initGodotHubConfig');
const initConfigFile = require('../Init/initConfigFile');
const { ipcRenderer } = require('electron');

// import and use godot hub directory while saving its path
const importGodotHub = (godotHubPath) => {
  const requiredPaths = [
    path.join(godotHubPath, 'Releases'),
    path.join(godotHubPath, '.cache'),
    path.join(godotHubPath, '.config')
  ];

  const isValidGodotHubDir = requiredPaths.map(currentPath => {
    if (!fs.existsSync(currentPath)) {
      return false;
    } else {
      return true;
    }
  });

  // create godot hub config if godot hub directory is valid
  if (!isValidGodotHubDir.includes(false)) {
    initGodotHubConfig(godotHubPath);
    initConfigFile(godotHubPath);
    ipcRenderer.send('navigate', { filePath: './src/views/Index/index.html' });
  }
};

module.exports = importGodotHub;
