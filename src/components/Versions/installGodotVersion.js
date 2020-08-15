const { ipcRenderer } = require('electron');
const getGodotURL = require('../../helpers/URL/getGodotURL');
const getMonoURL = require('../../helpers/URL/getMonoURL');
const getOSinfo = require('../../helpers/getOSinfo');

// install godot version, show download progress & stop download button
const installGodotVersion = (parent, type, url, version, godotHubPath, godotHubConfigPath) => {
  if (type === 'mono') {
    const OS = getOSinfo(true);

    getMonoURL(url, OS, version, godotHubPath, godotHubConfigPath);

    const progressElement = parent.querySelector('.progress');
    const stopDownloadElement = parent.querySelector('.stop-mono-download');
    const installElement = parent.querySelector('.install');

    progressElement.classList.remove('hidden');
    stopDownloadElement.classList.remove('hidden');
    installElement.classList.add('hidden');

    ipcRenderer.on(`getMono-${version}-progress`, (event, arg) => {
      const { percentage, total, current, totalMB, currentMB } = arg;
      console.log(`
        percentage: ${percentage}\n
        total: ${total}\n
        current: ${current}\n
        totalMB: ${totalMB}MB\n
        currentMB: ${currentMB}MB\n
      `);
      progressElement.textContent = ` ${percentage}% - ${currentMB}/${totalMB} MB`;
    });
  } else {
    const OS = getOSinfo();

    getGodotURL(url, OS, version, godotHubPath, godotHubConfigPath);

    const progressElement = parent.querySelector('.progress');
    const stopDownloadElement = parent.querySelector('.stop-godot-download');
    const installElement = parent.querySelector('.install');

    progressElement.classList.remove('hidden');
    stopDownloadElement.classList.remove('hidden');
    installElement.classList.add('hidden');

    ipcRenderer.on(`getGodot-${version}-progress`, (event, arg) => {
      const { percentage, total, current, totalMB, currentMB } = arg;
      console.log(`
        percentage: ${percentage}\n
        total: ${total}\n
        current: ${current}\n
        totalMB: ${totalMB}MB\n
        currentMB: ${currentMB}MB\n
      `);
      progressElement.textContent = ` ${percentage}% - ${currentMB}/${totalMB} MB`;
    });
  }
};

module.exports = installGodotVersion;
