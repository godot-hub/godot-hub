const path = require('path');
const { ipcRenderer } = require('electron');
const getExportTemplatesURL = require('../../helpers/URL/getExportTemplatesURL');
const getMonoExportTemplatesURL = require('../../helpers/URL/getMonoExportTemplatesURL');
const getOSinfo = require('../../helpers/getOSinfo');

// install export templates of godot version, show download progress & stop download button
const installVersionExportTemplates = (parent, type, url, version, godotVersion, godotHubPath, godotHubConfigPath) => {
  if (type === 'mono') {
    const OS = getOSinfo(true);

    getMonoExportTemplatesURL(url, version, godotVersion, OS, godotHubPath);

    const progressElement = parent.querySelector('.progress');
    const stopDownloadElement = parent.querySelector('.stop');
    const installElement = parent.querySelector('.install-export-templates');
    const uninstallElement = parent.querySelector('.uninstall');

    if (!progressElement) {
      // show progress element
      const progress = document.createElement('p');
      const progressText = document.createTextNode('0% - 0/0 MB');
      progress.appendChild(progressText);

      parent.removeChild(installElement);
      parent.removeChild(uninstallElement);
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

          ipcRenderer.send(`getMonoExportTemplates-Stop-${version}`);

          const install = document.createElement('p');
          const installText = document.createTextNode('Install Export Templates');
          install.appendChild(installText);
          parent.appendChild(install);
          install.setAttribute('class', 'install-export-templates');

          install.addEventListener('click', (e) => {
            const { type, url, version } = e.target.parentElement.dataset;
            const parent = e.target.parentElement;

            installVersionExportTemplates(parent, type, url, version, godotVersion, godotHubPath);
          });

          const confirmUnistallVersion = require('./confirmUninstallVersion');
          const uninstall = document.createElement('p');
          const uninstallText = document.createTextNode('Uninstall');
          uninstall.appendChild(uninstallText);
          parent.appendChild(uninstall);
          uninstall.setAttribute('class', 'uninstall');

          uninstall.addEventListener('click', (e) => {
            const { type, url, version } = e.target.parentElement.dataset;
            const releasePath = path.join(godotHubPath, 'Releases', version, 'Engine');
            confirmUnistallVersion(version, releasePath, godotHubPath, godotHubConfigPath);
          });
        });
      }

      ipcRenderer.on(`getMonoExportTemplates${version}-progress`, (event, arg) => {
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

    getExportTemplatesURL(url, version, godotHubPath);

    const progressElement = parent.querySelector('.progress');
    const stopDownloadElement = parent.querySelector('.stop');
    const installElement = parent.querySelector('.install-export-templates');
    const uninstallElement = parent.querySelector('.uninstall');

    if (!progressElement) {
      // show progress element
      const progress = document.createElement('p');
      const progressText = document.createTextNode('0% - 0/0 MB');
      progress.appendChild(progressText);

      parent.removeChild(installElement);
      parent.removeChild(uninstallElement);
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

          ipcRenderer.send(`getExportTemplates-Stop-${version}`);

          const install = document.createElement('p');
          const installText = document.createTextNode('Install Export Templates');
          install.appendChild(installText);
          parent.appendChild(install);
          install.setAttribute('class', 'install-export-templates');

          install.addEventListener('click', (e) => {
            const { type, url, version } = e.target.parentElement.dataset;
            const parent = e.target.parentElement;

            installVersionExportTemplates(parent, type, url, version, godotVersion, godotHubPath);
          });

          const confirmUnistallVersion = require('./confirmUninstallVersion');
          const uninstall = document.createElement('p');
          const uninstallText = document.createTextNode('Uninstall');
          uninstall.appendChild(uninstallText);
          parent.appendChild(uninstall);
          uninstall.setAttribute('class', 'uninstall');

          uninstall.addEventListener('click', (e) => {
            const { type, url, version } = e.target.parentElement.dataset;
            const releasePath = path.join(godotHubPath, 'Releases', version, 'Engine');
            confirmUnistallVersion(version, releasePath, godotHubPath, godotHubConfigPath);
          });
        });
      }

      ipcRenderer.on(`getExportTemplates${version}-progress`, (event, arg) => {
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

module.exports = installVersionExportTemplates;
