const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');
const back = document.querySelector('#back');

back.addEventListener('click', () => {
  ipcRenderer.send('navigate', { filePath: './src/components/Index/index.html' });
});

// godot hub path
const godotHubConfigPath = path.join(process.cwd(), 'godot-hub.json');
const godotHubPath = JSON.parse(fs.readFileSync(godotHubConfigPath)).godotHubPath;

// render current projects
const renderProjects = require('./renderProjects');
renderProjects(godotHubPath);
