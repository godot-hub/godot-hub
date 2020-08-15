const { ipcRenderer } = require('electron');
const path = require('path');
const initScFile = require('../Init/initScFile');
const initReleaseDir = require('../Init/initReleaseDir');
const initProjectsDir = require('../Init/initProjectsDir');
const initEngineDir = require('../Init/initEngineDir');
const initEditorDataDir = require('../Init/initEditorDataDir');
const initTemplatesDir = require('../Init/initTemplatesDir');
const renderVersions = require('../../components/Versions/renderVersions');
const setLatestInstalledReleaseVersion = require('../Releases/setLatestInstalledReleaseVersion');

// download Godot Mono based on provided specific version
const getMono = (url, monoPath, filename, monoDir, version, godotHubPath, godotHubConfigPath) => {
  console.log(`getMono godotHubConfigPath: ${godotHubConfigPath}`);
  const filePath = path.join(monoPath, 'Engine', filename);

  // init required directories
  initReleaseDir(godotHubPath, version);
  initEngineDir(godotHubPath, version);
  initProjectsDir(godotHubPath, version);

  ipcRenderer.send('getMono-request', { url, path: filePath, extractTarget: path.join(monoPath, 'Engine'), version });
  ipcRenderer.on(`getMono-Done-${version}`, () => {
    initScFile(godotHubPath, version, true, monoDir);
    initEditorDataDir(godotHubPath, version, true, monoDir);
    initTemplatesDir(godotHubPath, version, true, monoDir);

    console.log('getMono - DONE');

    renderVersions(godotHubPath, godotHubConfigPath);
    setLatestInstalledReleaseVersion(version, godotHubConfigPath);
    ipcRenderer.removeAllListeners(`getMono-Done-${version}`);
  });
};

module.exports = getMono;
