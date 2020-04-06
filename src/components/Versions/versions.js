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
    <article
      data-name="${name}"
    >
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
    <section class="release-section"> 
      <h3>Godot ${release}</h3>
      <section id="release-${release}-body">
      </seciton>
    </section>
  `;

  availableVersionsListElement.insertAdjacentHTML('beforeend', releaseSection);

  const releaseBody = document.querySelector('#release-' + release + '-body');

  cachedReleases[release].map(release => {
    // filter out installed releases from available versions
    console.log(installedReleases);
    if (!installedReleases.includes(release.version)) {
      console.log(installedReleases.includes(release.version));
      releaseBody.insertAdjacentHTML('beforeend', availableReleaseElement(release));
    }
  });
}

// install godot version
const installGodotVersion = require('../../components/Versions/installGodotVersion');
const installElements = document.querySelectorAll('.install');

installElements.forEach(installElement => {
  installElement.addEventListener('click', (e) => {
    const { type, url, version } = e.target.parentElement.dataset;
    const parent = e.target.parentElement;

    installGodotVersion(parent, type, url, version, godotHubPath);
  });
});
