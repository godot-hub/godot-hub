const { ipcRenderer } = require('electron');

// stop current mono export templates download
const stopMonoExportTemplatesDownload = (e) => {
  const { type, url, version } = e.target.parentElement.dataset;
  const parent = e.target.parentElement;

  ipcRenderer.send(`getMonoExportTemplates-Stop-${version}`);

  const progressElement = parent.querySelector('.progress');
  const stopDownloadElement = parent.querySelector('.stop-mono-export-templates-download');
  const installElement = parent.querySelector('.install-export-templates');
  const uninstallElement = parent.querySelector('.uninstall');

  stopDownloadElement.classList.add('hidden');
  progressElement.classList.add('hidden');
  installElement.classList.remove('hidden');
  uninstallElement.classList.remove('hidden');

  progressElement.textContent = '0% - 0/0 MB';

  ipcRenderer.removeAllListeners(`getMonoExportTemplates-${version}-progress`);
  sessionStorage.removeItem(`mono-export-templates-${version}`);
};

module.exports = stopMonoExportTemplatesDownload;
