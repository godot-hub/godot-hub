const { ipcRenderer } = require('electron');
const getGodotURL = require('../../helpers/URL/getGodotURL');
const getMonoURL = require('../../helpers/URL/getMonoURL');
const getOSinfo = require('../../helpers/getOSinfo');

// install godot version, show download progress & stop download button
const installGodotVersion = (parent, type, url, version, godotHubPath) => {
  if (type === 'mono') {
    const OS = getOSinfo(true);

    getMonoURL(url, OS, version, godotHubPath);

    const progressElement = parent.querySelector('.progress');
    const installElement = parent.querySelector('.install');

    if (!progressElement) {
      // show progress element
      const progress = document.createElement('p');
      const progressText = document.createTextNode('0% - 0/0 MB');
      progress.appendChild(progressText);

      parent.removeChild(installElement);
      parent.appendChild(progress);
      progress.setAttribute('class', 'progress');

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

    getGodotURL(url, OS, version, godotHubPath);

    const progressElement = parent.querySelector('.progress');
    const installElement = parent.querySelector('.install');

    if (!progressElement) {
      // show progress element
      const progress = document.createElement('p');
      const progressText = document.createTextNode('0% - 0/0 MB');
      progress.appendChild(progressText);

      parent.removeChild(installElement);
      parent.appendChild(progress);
      progress.setAttribute('class', 'progress');

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
