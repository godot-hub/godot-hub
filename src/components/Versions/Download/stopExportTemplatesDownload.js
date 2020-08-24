const { ipcRenderer } = require('electron');

// stop current export templates download
const stopExportTemplatesDownload = (e) => {
  const { type, url, version } = e.target.parentElement.dataset;
  const parent = e.target.parentElement;

  ipcRenderer.send(`getExportTemplates-Stop-${version}`);

  const progressElement = parent.querySelector('.progress');
  const stopDownloadElement = parent.querySelector('.stop-export-templates-download');
  const installElement = parent.querySelector('.install-export-templates');
  const uninstallElement = parent.querySelector('.uninstall');

  stopDownloadElement.classList.add('hidden');
  progressElement.classList.add('hidden');
  installElement.classList.remove('hidden');
  uninstallElement.classList.remove('hidden');

  progressElement.textContent = '0% - 0/0 MB';

  ipcRenderer.removeAllListeners(`getExportTemplates-${version}-progress`);
  sessionStorage.removeItem(`export-templates-${version}`);
};

module.exports = stopExportTemplatesDownload;
