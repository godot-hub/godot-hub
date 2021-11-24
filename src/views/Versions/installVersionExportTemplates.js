const { ipcRenderer } = require('electron');
const getExportTemplatesURL = require('../../helpers/URL/getExportTemplatesURL');
const getMonoExportTemplatesURL = require('../../helpers/URL/getMonoExportTemplatesURL');
const getOSinfo = require('../../helpers/getOSinfo');

// install export templates of godot version, show download progress & stop download button
const installVersionExportTemplates = (parent, type, url, version, godotVersion, godotHubPath, godotHubConfigPath) => {
  if (type === 'mono') {
    const OS = getOSinfo(true);

    getMonoExportTemplatesURL(url, version, godotVersion, OS, godotHubPath, godotHubConfigPath);

    sessionStorage.setItem(`mono-export-templates-${version}`, true);

    const progressElement = parent.querySelector('.progress');
    const stopDownloadElement = parent.querySelector('.stop-mono-export-templates-download');
    const installElement = parent.querySelector('.install-export-templates');
    const uninstallElement = parent.querySelector('.uninstall');

    progressElement.classList.remove('hidden');
    stopDownloadElement.classList.remove('hidden');
    installElement.classList.add('hidden');
    uninstallElement.classList.add('hidden');

    ipcRenderer.on(`getMonoExportTemplates-${version}-progress`, (event, arg) => {
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

    ipcRenderer.on(`getMonoExportTemplates-Installing-${version}`, () => {
      progressElement.textContent = 'Installing ...';
      ipcRenderer.removeAllListeners(`getMonoExportTemplates-Installing-${version}`);
    });
  } else {
    getExportTemplatesURL(url, version, godotHubPath, godotHubConfigPath);

    sessionStorage.setItem(`export-templates-${version}`, true);

    const progressElement = parent.querySelector('.progress');
    const stopDownloadElement = parent.querySelector('.stop-export-templates-download');
    const installElement = parent.querySelector('.install-export-templates');
    const uninstallElement = parent.querySelector('.uninstall');

    progressElement.classList.remove('hidden');
    stopDownloadElement.classList.remove('hidden');
    installElement.classList.add('hidden');
    uninstallElement.classList.add('hidden');

    ipcRenderer.on(`getExportTemplates-${version}-progress`, (event, arg) => {
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

    ipcRenderer.on(`getExportTemplates-Installing-${version}`, () => {
      progressElement.textContent = 'Installing ...';
      ipcRenderer.removeAllListeners(`getExportTemplates-Installing-${version}`);
    });
  }
};

module.exports = installVersionExportTemplates;
