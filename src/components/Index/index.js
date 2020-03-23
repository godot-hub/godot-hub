const { ipcRenderer } = require('electron');
const projects = document.querySelector('#projects');
const versions = document.querySelector('#versions');
const tutorials = document.querySelector('#tutorials');
const about = document.querySelector('#about');

projects.addEventListener('click', () => {
  ipcRenderer.send('navigate', { filePath: './src/components/Projects/projects.html' });
});

versions.addEventListener('click', () => {
  ipcRenderer.send('navigate', { filePath: './src/components/Versions/versions.html' });
});

tutorials.addEventListener('click', () => {
  ipcRenderer.send('navigate', { filePath: './src/components/Tutorials/tutorials.html' });
});

about.addEventListener('click', () => {
  ipcRenderer.send('navigate', { filePath: './src/components/About/about.html' });
});
