const path = require('path');
const fs = require('fs');

// render godot versions based on data provided
const renderVersions = (godotHubPath, godotHubConfigPath) => {
  console.log(`render versions godotHubConfigPath: ${godotHubConfigPath}`);
  // get cached releases
  const cachedReleasesPath = path.join(godotHubPath, '.cache', 'sortReleases.json');
  const cachedReleases = JSON.parse(fs.readFileSync(cachedReleasesPath));

  // render installed releases as available releases in versions view
  const getInstalledReleases = require('../../helpers/Releases/getInstalledReleases');
  const installedReleases = getInstalledReleases(godotHubPath);

  const installedVersionsListElement = document.querySelector('#installed-versions-list');
  // empty installed versions list
  while (installedVersionsListElement.firstChild) {
    installedVersionsListElement.removeChild(installedVersionsListElement.firstChild);
  }

  // get installed release export templates
  const getInstalledReleaseExportTemplates = require('../../helpers/Releases/getInstalledReleaseExportTemplates');
  const installedReleaseExportTemplates = getInstalledReleaseExportTemplates(godotHubPath, installedReleases);

  const installedReleaseElement = (info) => {
    const { type, name, url, version } = info;

    // show which releases have installed export templates
    if (installedReleaseExportTemplates.includes(version)) {
      if (type === 'mono') {
        return `
        <article
          id="installed-release-${name}"
          data-type="${type}"
          data-name="${name}"
          data-version="${version}"
          data-url="${url}"
          data-godot-version="${info.godotVersion}"
        >
          <p>Godot ${version}</p>
          <p class="uninstall">Uninstall</p>
        </article>
      `;
      } else {
        return `
        <article
          id="installed-release-${name}"
          data-type="${type}" 
          data-name="${name}"
          data-version="${version}"
          data-url="${url}"
        >
          <p>Godot ${version}</p>
          <p class="uninstall">Uninstall</p>
        </article>
      `;
      }
    } else {
      if (type === 'mono') {
        return `
        <article
          id="installed-release-${name}"
          data-type="${type}"
          data-name="${name}"
          data-version="${version}"
          data-url="${url}"
          data-godot-version="${info.godotVersion}"
        >
          <p>Godot ${version}</p>
          <p class="install-export-templates">Install Export Templates</p>
          <p class="uninstall">Uninstall</p>
        </article>
      `;
      } else {
        return `
        <article
          id="installed-release-${name}"
          data-type="${type}" 
          data-name="${name}"
          data-version="${version}"
          data-url="${url}"
        >
          <p>Godot ${version}</p>
          <p class="install-export-templates">Install Export Templates</p>
          <p class="uninstall">Uninstall</p>
        </article>
      `;
      }
    }
  };

  for (const release in cachedReleases) {
    cachedReleases[release].map(currentCachedRelease => {
      // render installed elements only
      currentCachedRelease.forEach(currentRelease => {
        if (installedReleases.includes(currentRelease.version)) {
          console.log(currentRelease);
          installedVersionsListElement.insertAdjacentHTML('beforeend', installedReleaseElement(currentRelease));
        }
      });
    });
  }

  // render available releases as available releases in versions view
  const availableVersionsListElement = document.querySelector('#available-versions-list');
  // empty available versions list
  while (availableVersionsListElement.firstChild) {
    availableVersionsListElement.removeChild(availableVersionsListElement.firstChild);
  }

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

    cachedReleases[release].map(currentCachedRelease => {
      // filter out installed releases from available versions
      currentCachedRelease.forEach(currentRelease => {
        if (!installedReleases.includes(currentRelease.version)) {
          console.log(installedReleases.includes(currentRelease.version));
          releaseBody.insertAdjacentHTML('beforeend', availableReleaseElement(currentRelease));
        }
      });
    });
  }

  // install godot version
  const installGodotVersion = require('./installGodotVersion');
  const installElements = document.querySelectorAll('.install');

  installElements.forEach(installElement => {
    installElement.addEventListener('click', (e) => {
      const { type, url, version } = e.target.parentElement.dataset;
      const parent = e.target.parentElement;

      installGodotVersion(parent, type, url, version, godotHubPath, godotHubConfigPath);
    });
  });

  // uninstall godot version
  const confirmUnistallVersion = require('./confirmUninstallVersion');
  const installedElements = document.querySelectorAll('.uninstall');

  installedElements.forEach(installedElement => {
    installedElement.addEventListener('click', (e) => {
      const { version } = e.target.parentElement.dataset;
      const releasePath = path.join(godotHubPath, 'Releases', version, 'Engine');
      confirmUnistallVersion(version, releasePath, godotHubPath, godotHubConfigPath);
    });
  });

  // install export templates
  const installExportTemplateElements = document.querySelectorAll('.install-export-templates');
  const installVersionExportTemplates = require('./installVersionExportTemplates');

  installExportTemplateElements.forEach(installExportTemplateElement => {
    installExportTemplateElement.addEventListener('click', (e) => {
      const { type, url, version, godotVersion } = e.target.parentElement.dataset;
      const parent = e.target.parentElement;

      if (godotVersion) {
        installVersionExportTemplates(parent, type, url, version, godotVersion, godotHubPath, godotHubConfigPath);
      } else {
        installVersionExportTemplates(parent, type, url, version, false, godotHubPath, godotHubConfigPath);
      }
    });
  });
};

module.exports = renderVersions;
