// get dependencies
const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');

// godot hub path
const godotHubConfigPath = path.join(process.cwd(), 'godot-hub.json');
const godotHubPath = JSON.parse(fs.readFileSync(godotHubConfigPath)).godotHubPath;

// get elements
const projects = document.querySelector('#projects');
const versions = document.querySelector('#versions');
const tutorials = document.querySelector('#tutorials');
const about = document.querySelector('#about');
const settings = document.querySelector('#settings');

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

settings.addEventListener('click', () => {
  ipcRenderer.send('navigate', { filePath: './src/components/Settings/settings.html' });
});

// Init important directories if they don't exist
const initReleasesDir = require('../../helpers/Init/initReleasesDir');
const initCacheDir = require('../../helpers/Init/initCacheDir');
const initConfigDir = require('../../helpers/Init/initConfigDir');

initReleasesDir(godotHubPath);
initCacheDir(godotHubPath);
initConfigDir(godotHubPath);

// cache releases if cache doesn't exist
(async () => {
  const fetchReleases = require('../../helpers/Releases/fetchReleases');
  const filterReleases = require('../../helpers/Releases/filterReleases');
  const sortReleases = require('../../helpers/Releases/sortReleases');

  const releases = await fetchReleases(godotHubPath);
  const filter = await filterReleases(releases, godotHubPath);
  const sort = await sortReleases(filter, godotHubPath);
})();
