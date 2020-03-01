const { ipcRenderer } = require('electron');
const path = require('path');
const process = require('process');

// download export templates of provided specific godot version
const getExportTemplates = (url, exportTemplatesPath, filename) => {
  const filePath = path.join(process.cwd(), exportTemplatesPath, 'Engine', filename);

  ipcRenderer.send('getExportTemplates-request', { url, path: filePath });
};

module.exports = getExportTemplates;
