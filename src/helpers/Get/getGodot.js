const { ipcRenderer } = require('electron');
const path = require('path');
const process = require('process');

// download Godot based on provided specific version
const getGodot = (url, godotPath, filename) => {
  const filePath = path.join(process.cwd(), godotPath, 'Engine', filename);

  ipcRenderer.send('getGodot-request', { url, path: filePath, extractTarget: path.join(process.cwd(), godotPath) });
};

module.exports = getGodot;
