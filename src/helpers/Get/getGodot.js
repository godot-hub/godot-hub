const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');
const initScFile = require('../Init/initScFile');
const initReleaseDir = require('../Init/initReleaseDir');
const initProjectsDir = require('../Init/initProjectsDir');
const initEngineDir = require('../Init/initEngineDir');
const initEditorDataDir = require('../Init/initEditorDataDir');
const initTemplatesDir = require('../Init/initTemplatesDir');
const renderVersions = require('../../views/Versions/renderVersions');
const setLatestInstalledReleaseVersion = require('../Releases/setLatestInstalledReleaseVersion');

// download Godot based on provided specific version
const getGodot = (url, godotHubPath, filename, version, godotHubConfigPath) => {
  // init required directories
  initReleaseDir(godotHubPath, version);
  initEngineDir(godotHubPath, version);
  initProjectsDir(godotHubPath, version);
  initEditorDataDir(godotHubPath, version);
  initTemplatesDir(godotHubPath, version);

  // get godot version
  const filePath = path.join(godotHubPath, 'Releases', version, 'Engine', filename);

  ipcRenderer.send('getGodot-request', { url, path: filePath, extractTarget: path.join(godotHubPath, 'Releases', version, 'Engine'), version });
  ipcRenderer.on(`getGodot-Done-${version}`, () => {
    initScFile(godotHubPath, version);
    console.log('getGodot - DONE');
    sessionStorage.removeItem(`godot-${version}`);
    renderVersions(godotHubPath, godotHubConfigPath);
    setLatestInstalledReleaseVersion(version, godotHubConfigPath);

    // make sure that godot version has the right permission to execute
    const getReleaseName = require('../Releases/getReleaseName');
    const versionFileName = getReleaseName(version, 'godot');
    const versionFilePath = path.join(godotHubPath, 'Releases', version, 'Engine', versionFileName);

    fs.chmodSync(versionFilePath, '755');

    ipcRenderer.removeAllListeners(`getGodot-Done-${version}`);
  });
};

module.exports = getGodot;
