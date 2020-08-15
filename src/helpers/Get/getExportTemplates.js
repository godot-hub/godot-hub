const { ipcRenderer } = require('electron');
const path = require('path');
const installExportTemplates = require('../Install/installExportTemplates');

// download export templates of provided specific godot version
const getExportTemplates = (url, exportTemplatesPath, filename, godotHubPath, version, godotHubConfigPath) => {
  const filePath = path.join(godotHubPath, exportTemplatesPath, 'Engine', filename);

  ipcRenderer.send('getExportTemplates-request', { url, path: filePath, version });
  ipcRenderer.on(`getExportTemplates-Done-${version}`, () => {
    installExportTemplates(url, version, godotHubPath, godotHubConfigPath);
    ipcRenderer.removeAllListeners(`getExportTemplates-Done-${version}`);
  });
};

module.exports = getExportTemplates;
