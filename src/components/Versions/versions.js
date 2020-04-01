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

// get cached releases
const cachedReleasesPath = path.join(godotHubPath, '.cache', 'sortReleases.json');
const cachedReleases = JSON.parse(fs.readFileSync(cachedReleasesPath));

// render available releases as available releases in versions view
const availableVersionsListElement = document.querySelector('#available-versions-list');
const availableReleaseElement = (info) => {
  const { type, name, url, version } = info;

  if (type === 'mono') {
    return `
    <article 
      data-type="${type}"
      data-name="${name}"
      data-version="${version}"
      data-url="${url}"
      data-godot-version="${info.godotVersion}"
    >
      <p>Godot ${version}</p>
      <p class="install">Install</p>
    </article>
  `;

  } else {
    return `
    <article 
      data-type="${type}" 
      data-name="${name}"
      data-version="${version}"
      data-url="${url}"
    >
      <p>Godot ${version}</p>
      <p class="install">Install</p>
    </article>
  `;
  }
};

for (const release in cachedReleases) {
  const releaseSection = `
    <section id="release-section"> 
      <h3>Godot ${release}</h3>
      <section id="release-${release}-body">
      </seciton>
    </section>
  `;

  availableVersionsListElement.insertAdjacentHTML('beforeend', releaseSection);

  const releaseBody = document.querySelector('#release-' + release + '-body');

  cachedReleases[release].map(release => {
    releaseBody.insertAdjacentHTML('beforeend', availableReleaseElement(release));
  });
}

// install godot version
const getGodotURL = require('../../helpers/URL/getGodotURL');
const getMonoURL = require('../../helpers/URL/getMonoURL');
const getOSinfo = require('../../helpers/getOSinfo');
const installElements = document.querySelectorAll('.install');

installElements.forEach(installElement => {
  installElement.addEventListener('click', (e) => {
    const { type, url, version, godotVersion } = e.target.parentElement.dataset;

    if (type === 'mono') {
      const OS = getOSinfo(true);

      getMonoURL(url, OS, version);
    } else {
      const OS = getOSinfo();

      getGodotURL(url, OS, version);
    }
    console.log(e.target.parentElement.dataset);
  });
});