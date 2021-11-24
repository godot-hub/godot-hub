const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const back = document.querySelector('#back');

back.addEventListener('click', () => {
  ipcRenderer.send('navigate', { filePath: './src/views/Index/index.html' });
});

// godot hub path
const godotHubConfigPath = path.join(os.homedir(), '.godot-hub.json');
const godotHubPath = JSON.parse(fs.readFileSync(godotHubConfigPath)).godotHubPath;

// render current projects
const renderProjects = require('./renderProjects');
renderProjects(godotHubPath);

// create project
const renderCreateProject = require('./renderCreateProject');
renderCreateProject(godotHubPath, godotHubConfigPath);

// import project
const renderImportProject = require('./renderImportProject');
renderImportProject(godotHubPath, godotHubConfigPath);

// search project
const searchProject = require('./searchProject');
const search = document.querySelector('#search');

search.addEventListener('keyup', () => {
  searchProject(godotHubPath);
});

search.addEventListener('search', () => {
  if (search.value.length === 0) {
    renderProjects(godotHubPath);
  }
});
