const { ipcRenderer } = require('electron');
const path = require('path');
const process = require('process');

// download Godot Mono based on provided specific version
const getMono = (url, monoPath, filename) => {
  const filePath = path.join(process.cwd(), monoPath, filename);

  ipcRenderer.send('getMono-request', { url, path: filePath, extractTarget: path.join(process.cwd(), monoPath) });
};

module.exports = getMono;
