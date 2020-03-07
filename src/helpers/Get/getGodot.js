const { ipcRenderer } = require('electron');
const path = require('path');
const process = require('process');
const initScFile = require('../Init/initScFile');

// download Godot based on provided specific version
const getGodot = (url, godotPath, filename, version) => {
  const filePath = path.join(process.cwd(), godotPath, 'Engine', filename);

  ipcRenderer.send('getGodot-request', { url, path: filePath, extractTarget: path.join(process.cwd(), godotPath, 'Engine') });
  ipcRenderer.on('getGodot-Done', () => {
    initScFile(version);
    console.log('getGodot - DONE');
  });
};

module.exports = getGodot;
