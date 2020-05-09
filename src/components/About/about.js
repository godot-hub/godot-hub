const { ipcRenderer } = require('electron');
const { app } = require('electron').remote;
const back = document.querySelector('#back');

back.addEventListener('click', () => {
  ipcRenderer.send('navigate', { filePath: './src/components/Index/index.html' });
});

// get current app version
const version = document.querySelector('#version');
version.textContent = app.getVersion();
