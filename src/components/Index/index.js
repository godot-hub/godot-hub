// get dependencies
const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

// godot hub path
const godotHubConfigPath = path.join(os.homedir(), '.godot-hub.json');
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
  // check if there is new release version
  const checkLastReleaseVersion = require('../../helpers/Check/checkLastReleaseVersion');
  const cacheReleases = require('../../helpers/Cache/cacheReleases');

  const cachedReleasesPath = path.join(godotHubPath, '.cache', 'sortReleases.json');

  // cache releases if there is no cached releases at all
  if (!fs.existsSync(cachedReleasesPath)) {
    cacheReleases(godotHubPath);
  } else {
    const cachedReleases = JSON.parse(fs.readFileSync(cachedReleasesPath));
    const lastRelease = Object.keys(cachedReleases)[Object.keys(cachedReleases).length - 1];
    const lastReleaseVersion = cachedReleases[lastRelease][0][0].version;

    console.log(await checkLastReleaseVersion(lastReleaseVersion));

    // refetch and recache if there is a new version or if there is no cached releases at all
    if (await checkLastReleaseVersion(lastReleaseVersion)) {
      cacheReleases(godotHubPath);
    }
  }
})();
