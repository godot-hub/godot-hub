const { ipcRenderer } = require('electron');
const path = require('path');
const installMonoExportTemplates = require('../Install/installMonoExportTemplates');

// download export templates of provided specific mono version
const getMonoExportTemplates = (url, monoExportTemplatesPath, filename, monoDir, godotHubPath, version, godotVersion, godotHubConfigPath) => {
  const filePath = path.join(godotHubPath, monoExportTemplatesPath, 'Engine', monoDir, filename);

  ipcRenderer.send('getMonoExportTemplates-request', { url, path: filePath, version });
  ipcRenderer.on(`getMonoExportTemplates-Done-${version}`, () => {
    installMonoExportTemplates(url, version, monoDir, godotHubPath, godotVersion, godotHubConfigPath);
    ipcRenderer.removeAllListeners(`getMonoExportTemplates-Done-${version}`);
  });
};

module.exports = getMonoExportTemplates;
