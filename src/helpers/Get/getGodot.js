const { ipcRenderer } = require('electron');
const path = require('path');
const initScFile = require('../Init/initScFile');
const initReleaseDir = require('../Init/initReleaseDir');
const initProjectsDir = require('../Init/initProjectsDir');
const initEngineDir = require('../Init/initEngineDir');
const initEditorDataDir = require('../Init/initEditorDataDir');
const initTemplatesDir = require('../Init/initTemplatesDir');

// download Godot based on provided specific version
const getGodot = (url, godotHubPath, filename, version) => {
  // init required directories
  initReleaseDir(godotHubPath, version);
  initEngineDir(godotHubPath, version);
  initProjectsDir(godotHubPath, version);
  initEditorDataDir(godotHubPath, version);
  initTemplatesDir(godotHubPath, version);

  // get godot version
  const filePath = path.join(godotHubPath, 'Releases', version, 'Engine', filename);

  ipcRenderer.send('getGodot-request', { url, path: filePath, extractTarget: path.join(godotHubPath, 'Releases', version, 'Engine') });
  ipcRenderer.on('getGodot-Done', () => {
    initScFile(godotHubPath, version);
    console.log('getGodot - DONE');
  });
};

module.exports = getGodot;
