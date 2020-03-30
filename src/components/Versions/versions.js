const fs = require('fs');
const path = require('path');

const { ipcRenderer } = require('electron');
const back = document.querySelector('#back');

back.addEventListener('click', () => {
  ipcRenderer.send('navigate', { filePath: './src/components/Index/index.html' });
});

// godot hub path
const godotHubConfigPath = path.join(process.cwd(), 'godot-hub.json');
const godotHubPath = JSON.parse(fs.readFileSync(godotHubConfigPath)).godotHubPath;

// render installed releases as available releases in versions view
const getInstalledReleases = require('../../helpers/Releases/getInstalledReleases');
const installedReleases = getInstalledReleases(godotHubPath);

const installedVersionsListElement = document.querySelector('#installed-versions-list');
const installedReleaseElement = (name) => {
  return `
    <article>
      <p>Godot ${name}</p>
      <p class="uninstall">Uninstall</p>
    </article>
  `;
};

installedReleases.map(release => {
  installedVersionsListElement.insertAdjacentHTML('beforeend', installedReleaseElement(release));
});
