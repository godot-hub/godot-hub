const path = require('path');
const fs = require('fs');
const { ipcRenderer } = require('electron');

// render godot versions based on data provided
const renderVersions = (godotHubPath, godotHubConfigPath) => {
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
        if (`mono-export-templates-${version}` in sessionStorage) {
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
            <p class="install-export-templates hidden">Install Export Templates</p>
            <p class="uninstall hidden">Uninstall</p>
            <p class="progress">0% - 0/0 MB</p>
            <p class="stop-mono-export-templates-download">Stop Download</p>
          </article>
        `;
        } else {
          // keep track of mono versions that don't have export templates
          const nonMonoExportTemplatesVersions = ['3.0-mono', '3.0.1-mono', '3.0.2-mono'];
          // don't show option for installing export templates for non mono export templates versions
          if (nonMonoExportTemplatesVersions.includes(version)) {
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
              data-godot-version="${info.godotVersion}"
            >
              <p>Godot ${version}</p>
              <p class="install-export-templates">Install Export Templates</p>
              <p class="uninstall">Uninstall</p>
              <p class="progress hidden">0% - 0/0 MB</p>
              <p class="stop-mono-export-templates-download hidden">Stop Download</p>
            </article>
          `;
          }
        }
      } else {
        if (`export-templates-${version}` in sessionStorage) {
          return `
          <article
            id="installed-release-${name}"
            data-type="${type}" 
            data-name="${name}"
            data-version="${version}"
            data-url="${url}"
          >
            <p>Godot ${version}</p>
            <p class="install-export-templates hidden">Install Export Templates</p>
            <p class="uninstall hidden">Uninstall</p>
            <p class="progress">0% - 0/0 MB</p>
            <p class="stop-export-templates-download">Stop Download</p>
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
            <p class="progress hidden">0% - 0/0 MB</p>
            <p class="stop-export-templates-download hidden">Stop Download</p>
          </article>
        `;
        }
      }
    }
  };

  for (const release in cachedReleases) {
    for (const currentCachedRelease of cachedReleases[release]) {
      // render installed elements only
      for (const currentRelease of currentCachedRelease) {
        if (installedReleases.includes(currentRelease.version)) {
          console.log(currentRelease);
          installedVersionsListElement.insertAdjacentHTML('beforeend', installedReleaseElement(currentRelease));
        }
      }
    }
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
      if (`mono-${version}` in sessionStorage) {
        return `
        <article 
          data-type="${type}"
          data-name="${name}"
          data-version="${version}"
          data-url="${url}"
          data-godot-version="${info.godotVersion}"
        >
          <p>Godot ${version}</p>
          <p class="install hidden">Install</p>
          <p class="progress">0% - 0/0 MB</p>
          <p class="stop-mono-download">Stop Download</p>
        </article>
      `;
      } else {
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
          <p class="progress hidden">0% - 0/0 MB</p>
          <p class="stop-mono-download hidden">Stop Download</p>
        </article>
      `;
      }
    } else {
      if (`godot-${version}` in sessionStorage) {
        return `
        <article 
          data-type="${type}" 
          data-name="${name}"
          data-version="${version}"
          data-url="${url}"
        >
          <p>Godot ${version}</p>
          <p class="install hidden">Install</p>
          <p class="progress">0% - 0/0 MB</p>
          <p class="stop-godot-download">Stop Download</p>
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
          <p class="progress hidden">0% - 0/0 MB</p>
          <p class="stop-godot-download hidden">Stop Download</p>
        </article>
      `;
      }
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

    for (const currentCachedRelease of cachedReleases[release]) {
      for (const currentRelease of currentCachedRelease) {
        if (!installedReleases.includes(currentRelease.version)) {
          console.log(installedReleases.includes(currentRelease.version));
          releaseBody.insertAdjacentHTML('beforeend', availableReleaseElement(currentRelease));
        }
      }
    }
  }

  // install godot version
  const installGodotVersion = require('./installGodotVersion');
  const installElements = document.querySelectorAll('.install');

  function installVersion (e) {
    const { type, url, version } = e.target.parentElement.dataset;
    const parent = e.target.parentElement;

    installGodotVersion(parent, type, url, version, godotHubPath, godotHubConfigPath);
  }

  for (const installElement of installElements) {
    installElement.addEventListener('click', installVersion);
  }

  // uninstall godot version
  const confirmUnistallVersion = require('./confirmUninstallVersion');
  const installedElements = document.querySelectorAll('.uninstall');

  function uninstallGodotVersion (e) {
    const { version } = e.target.parentElement.dataset;
    const releasePath = path.join(godotHubPath, 'Releases', version, 'Engine');
    confirmUnistallVersion(version, releasePath, godotHubPath, godotHubConfigPath);
  }

  for (const installedElement of installedElements) {
    installedElement.addEventListener('click', uninstallGodotVersion);
  }

  // install export templates
  const installExportTemplateElements = document.querySelectorAll('.install-export-templates');
  const installVersionExportTemplates = require('./installVersionExportTemplates');

  function installExportTemplate (e) {
    const { type, url, version, godotVersion } = e.target.parentElement.dataset;
    const parent = e.target.parentElement;

    if (godotVersion) {
      installVersionExportTemplates(parent, type, url, version, godotVersion, godotHubPath, godotHubConfigPath);
    } else {
      installVersionExportTemplates(parent, type, url, version, false, godotHubPath, godotHubConfigPath);
    }
  }

  for (const installExportTemplateElement of installExportTemplateElements) {
    installExportTemplateElement.addEventListener('click', installExportTemplate);
  }

  // confirm stop download
  const confirmStopDownloadVersion = require('./Download/confirmStopDownloadVersion');

  // stop mono download
  const stopMonoDownloadElements = document.querySelectorAll('.stop-mono-download');

  for (const stopMonoDownloadElement of stopMonoDownloadElements) {
    stopMonoDownloadElement.addEventListener('click', (e) => {
      confirmStopDownloadVersion(e, 'mono');
    });
  }

  // stop godot download
  const stopGodotDownloadElements = document.querySelectorAll('.stop-godot-download');

  for (const stopGodotDownloadElement of stopGodotDownloadElements) {
    stopGodotDownloadElement.addEventListener('click', (e) => {
      confirmStopDownloadVersion(e, 'godot');
    });
  }

  // stop mono export templates download
  const stopMonoExportTemplatesDownloadElements = document.querySelectorAll('.stop-mono-export-templates-download');

  for (const stopMonoExportTemplatesDownloadElement of stopMonoExportTemplatesDownloadElements) {
    stopMonoExportTemplatesDownloadElement.addEventListener('click', (e) => {
      confirmStopDownloadVersion(e, 'mono-export-templates');
    });
  }

  // stop export templates download
  const stopExportTemplatesDownloadElements = document.querySelectorAll('.stop-export-templates-download');

  for (const stopExportTemplatesDownloadElement of stopExportTemplatesDownloadElements) {
    stopExportTemplatesDownloadElement.addEventListener('click', (e) => {
      confirmStopDownloadVersion(e, 'export-templates');
    });
  }

  // sync download progress
  const progressElements = document.querySelectorAll('.progress');

  for (const progressElement of progressElements) {
    const { type, url, version } = progressElement.parentElement.dataset;

    if (type === 'mono') {
      ipcRenderer.on(`getMono-${version}-progress`, (event, arg) => {
        const { percentage, total, current, totalMB, currentMB } = arg;
        console.log(`
          percentage: ${percentage}\n
          total: ${total}\n
          current: ${current}\n
          totalMB: ${totalMB}MB\n
          currentMB: ${currentMB}MB\n
        `);
        progressElement.textContent = ` ${percentage}% - ${currentMB}/${totalMB} MB`;
      });

      ipcRenderer.on(`getMonoExportTemplates-${version}-progress`, (event, arg) => {
        const { percentage, total, current, totalMB, currentMB } = arg;
        console.log(`
          percentage: ${percentage}\n
          total: ${total}\n
          current: ${current}\n
          totalMB: ${totalMB}MB\n
          currentMB: ${currentMB}MB\n
        `);

        progressElement.textContent = ` ${percentage}% - ${currentMB}/${totalMB} MB`;
      });
    } else {
      ipcRenderer.on(`getGodot-${version}-progress`, (event, arg) => {
        const { percentage, total, current, totalMB, currentMB } = arg;
        console.log(`
          percentage: ${percentage}\n
          total: ${total}\n
          current: ${current}\n
          totalMB: ${totalMB}MB\n
          currentMB: ${currentMB}MB\n
        `);
        progressElement.textContent = ` ${percentage}% - ${currentMB}/${totalMB} MB`;
      });

      ipcRenderer.on(`getExportTemplates-${version}-progress`, (event, arg) => {
        const { percentage, total, current, totalMB, currentMB } = arg;
        console.log(`
          percentage: ${percentage}\n
          total: ${total}\n
          current: ${current}\n
          totalMB: ${totalMB}MB\n
          currentMB: ${currentMB}MB\n
        `);
        progressElement.textContent = ` ${percentage}% - ${currentMB}/${totalMB} MB`;
      });
    }
  }
};

module.exports = renderVersions;
