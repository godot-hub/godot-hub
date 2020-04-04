const { ipcRenderer } = require('electron');
const path = require('path');
const initScFile = require('../Init/initScFile');
const initReleaseDir = require('../Init/initReleaseDir');
const initProjectsDir = require('../Init/initProjectsDir');
const initEngineDir = require('../Init/initEngineDir');
const initEditorDataDir = require('../Init/initEditorDataDir');
const initTemplatesDir = require('../Init/initTemplatesDir');

// download Godot Mono based on provided specific version
const getMono = (url, monoPath, filename, monoDir, version, godotHubPath) => {
  const filePath = path.join(monoPath, 'Engine', filename);

  // init required directories
  initReleaseDir(godotHubPath, version);
  initEngineDir(godotHubPath, version);
  initProjectsDir(godotHubPath, version);
  initEditorDataDir(godotHubPath, version);
  initTemplatesDir(godotHubPath, version);

  ipcRenderer.send('getMono-request', { url, path: filePath, extractTarget: path.join(monoPath, 'Engine') });
  ipcRenderer.on('getMono-Done', () => {
    initScFile(godotHubPath, version);
    console.log('getMono - DONE');
  });
};

module.exports = getMono;
