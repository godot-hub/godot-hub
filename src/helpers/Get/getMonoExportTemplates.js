const { ipcRenderer } = require('electron');
const path = require('path');
const process = require('process');

// download export templates of provided specific mono version
const getMonoExportTemplates = (url, monoExportTemplatesPath, filename, monoDir) => {
  const filePath = path.join(process.cwd(), monoExportTemplatesPath, 'Engine', monoDir, filename);

  ipcRenderer.send('getMonoExportTemplates-request', { url, path: filePath });
};

module.exports = getMonoExportTemplates;
