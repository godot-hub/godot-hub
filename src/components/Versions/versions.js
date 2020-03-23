const { ipcRenderer } = require('electron');
const back = document.querySelector('#back');

back.addEventListener('click', () => {
  ipcRenderer.send('navigate', { filePath: './src/components/Index/index.html' });
});
