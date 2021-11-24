const { ipcRenderer } = require('electron');

// stop current godot download4
const stopGodotDownload = (e) => {
  const { type, url, version } = e.target.parentElement.dataset;
  const parent = e.target.parentElement;

  ipcRenderer.send(`getGodot-Stop-${version}`);

  const progressElement = parent.querySelector('.progress');
  const stopDownloadElement = parent.querySelector('.stop-godot-download');
  const installElement = parent.querySelector('.install');

  stopDownloadElement.classList.add('hidden');
  progressElement.classList.add('hidden');
  installElement.classList.remove('hidden');

  progressElement.textContent = '0% - 0/0 MB';

  ipcRenderer.removeAllListeners(`getGodot-${version}-progress`);
  sessionStorage.removeItem(`godot-${version}`);
};

module.exports = stopGodotDownload;
