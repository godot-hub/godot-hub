const { ipcRenderer } = require('electron');
const path = require('path');
const process = require('process');
const initScFile = require('../Init/initScFile');

// download Godot Mono based on provided specific version
const getMono = (url, monoPath, filename, monoDir, version) => {
  const filePath = path.join(process.cwd(), monoPath, 'Engine', filename);

  ipcRenderer.send('getMono-request', { url, path: filePath, extractTarget: path.join(process.cwd(), monoPath, 'Engine') });
  ipcRenderer.on('getMono-Done', () => {
    initScFile(version, monoDir);
    console.log('getMono - DONE');
  });
};

module.exports = getMono;
