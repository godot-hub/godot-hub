const { ipcRenderer } = require('electron');

// stop current mono download
const stopMonoDownload = (e) => {
  const { type, url, version } = e.target.parentElement.dataset;
  const parent = e.target.parentElement;

  ipcRenderer.send(`getMono-Stop-${version}`);

  const progressElement = parent.querySelector('.progress');
  const stopDownloadElement = parent.querySelector('.stop-mono-download');
  const installElement = parent.querySelector('.install');

  stopDownloadElement.classList.add('hidden');
  progressElement.classList.add('hidden');
  installElement.classList.remove('hidden');

  progressElement.textContent = '0% - 0/0 MB';

  ipcRenderer.removeAllListeners(`getMono-${version}-progress`);
  sessionStorage.removeItem(`mono-${version}`);
};

module.exports = stopMonoDownload;
