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
    const stopDownloadElement = parent.querySelector('.stop');
    const installElement = parent.querySelector('.install');

    if (!progressElement) {
      // show progress element
      const progress = document.createElement('p');
      const progressText = document.createTextNode('0% - 0/0 MB');
      progress.appendChild(progressText);

      parent.removeChild(installElement);
      parent.appendChild(progress);
      progress.setAttribute('class', 'progress');

      if (!stopDownloadElement) {
        // show stop download element
        const stopDownload = document.createElement('p');
        const stopDownloadText = document.createTextNode('Stop Download');
        stopDownload.setAttribute('class', 'stop');
        stopDownload.appendChild(stopDownloadText);
        parent.appendChild(stopDownload);

        stopDownload.addEventListener('click', () => {
          parent.removeChild(progress);
          parent.removeChild(stopDownload);

          ipcRenderer.send('getMono-Stop');

          const install = document.createElement('p');
          const installText = document.createTextNode('Install');
          install.appendChild(installText);
          parent.appendChild(install);
          install.setAttribute('class', 'install');

          install.addEventListener('click', (e) => {
            const { type, url, version } = e.target.parentElement.dataset;
            const parent = e.target.parentElement;

            installGodotVersion(parent, type, url, version, godotHubPath, godotHubConfigPath);
          });
        });
      }

      ipcRenderer.on(`${version}-progress`, (event, arg) => {
        const { percentage, total, current, totalMB, currentMB } = arg;
        console.log(`
          percentage: ${percentage}\n
          total: ${total}\n
          current: ${current}\n
          totalMB: ${totalMB}MB\n
          currentMB: ${currentMB}MB\n
        `);
        progress.textContent = ` ${percentage}% - ${currentMB}/${totalMB} MB`;
      });
    }
  } else {
    const OS = getOSinfo();

    getGodotURL(url, OS, version, godotHubPath, godotHubConfigPath);

    const progressElement = parent.querySelector('.progress');
    const stopDownloadElement = parent.querySelector('.stop');
    const installElement = parent.querySelector('.install');

    if (!progressElement) {
      // show progress element
      const progress = document.createElement('p');
      const progressText = document.createTextNode('0% - 0/0 MB');
      progress.appendChild(progressText);

      parent.removeChild(installElement);
      parent.appendChild(progress);
      progress.setAttribute('class', 'progress');

      if (!stopDownloadElement) {
        // show stop download element
        const stopDownload = document.createElement('p');
        const stopDownloadText = document.createTextNode('Stop Download');
        stopDownload.setAttribute('class', 'stop');
        stopDownload.appendChild(stopDownloadText);
        parent.appendChild(stopDownload);

        stopDownload.addEventListener('click', () => {
          parent.removeChild(progress);
          parent.removeChild(stopDownload);

          ipcRenderer.send('getGodot-Stop');

          const install = document.createElement('p');
          const installText = document.createTextNode('Install');
          install.appendChild(installText);
          parent.appendChild(install);
          install.setAttribute('class', 'install');

          install.addEventListener('click', (e) => {
            const { type, url, version } = e.target.parentElement.dataset;
            const parent = e.target.parentElement;

            installGodotVersion(parent, type, url, version, godotHubPath, godotHubConfigPath);
          });
        });
      }

      ipcRenderer.on(`${version}-progress`, (event, arg) => {
        const { percentage, total, current, totalMB, currentMB } = arg;
        console.log(`
          percentage: ${percentage}\n
          total: ${total}\n
          current: ${current}\n
          totalMB: ${totalMB}MB\n
          currentMB: ${currentMB}MB\n
        `);
        progress.textContent = ` ${percentage}% - ${currentMB}/${totalMB} MB`;
      });
    }
  }
};

module.exports = installGodotVersion;
