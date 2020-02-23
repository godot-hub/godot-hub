const { ipcRenderer } = require('electron');
const path = require('path');
const process = require('process');

// download Godot based on provided specific version
const getGodot = (url, godotPath, filename) => {
  const filePath = path.join(process.cwd(), godotPath, filename);

  ipcRenderer.send('getGodot-request', { url, path: filePath });
};

module.exports = getGodot;