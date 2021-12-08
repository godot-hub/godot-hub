const { ipcRenderer } = require('electron');
const back = document.querySelector('#back');

back.addEventListener('click', () => {
  ipcRenderer.send('navigate', { filePath: './src/views/Index/index.html' });
});

// handle confirm close godot hub
const confirmCloseGodotHub = require('../../helpers/GodotHub/confirmCloseGodotHub');

ipcRenderer.on('should-quit', () => {
  confirmCloseGodotHub();
});
