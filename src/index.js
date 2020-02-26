const { ipcRenderer } = require('electron');

const body = document.querySelector('#godot-hub');

// title - <h1>Godot Hub</h1>
const title = document.createElement('h1');
title.textContent = 'Godot Hub';

const downloads = `
  <article>
    <label>Godot</label>
    <input id="download-godot" type="button" value="Download">
    <progress id="godot-progress" max="100" value="0">0%</progress>
  </article>
  <article>
    <label>Export Templates</label>
    <input id="download-export-templates" type="button" value="Download">
    <progress id="export-templates-progress" max="100" value="0">0%</progress>
  </article>
  <article>
    <label>Mono</label>
    <input id="download-mono" type="button" value="Download">
    <progress id="mono-progress" max="100" value="0">0%</progress>
  </article>
  <article>
    <label>Mono Export Templates</label>
    <input id="download-mono-export-templates"  type="button" value="Download">
    <progress id="mono-export-templates-progress" max="100" value="0">0%</progress>
  </article>
`;

body.appendChild(title);
body.insertAdjacentHTML('beforeend', downloads);

(async () => {
  try {
    const fetchReleases = require('./helpers/Releases/fetchReleases');
    const filterReleases = require('./helpers/Releases/filterReleases');
    const sortReleases = require('./helpers/Releases/sortReleases');
    const scrapURL = require('./helpers/URL/scrapURL');
    const getScrapedURL = require('./helpers/URL/getScrapedURL');
    const initGodotHubDir = require('./helpers/Init/initGodotHubDir');
    const initReleaseDir = require('./helpers/Init/initReleaseDir');
    const initProjectsDir = require('./helpers/Init/initProjectsDir');
    const getGodotURL = require('./helpers/URL/getGodotURL');
    const getExportTemplatesURL = require('./helpers/URL/getExportTemplatesURL');
    const getMonoURL = require('./helpers/URL/getMonoURL');
    const getMonoExportTemplatesURL = require('./helpers/URL/getMonoExportTemplatesURL');

    const releases = await fetchReleases();
    const filter = await filterReleases(releases);
    const sort = await sortReleases(filter);
    const scrap = scrapURL('https://downloads.tuxfamily.org/godotengine/3.2/', '3.2');
    const getScraped = getScrapedURL();

    initGodotHubDir();
    initReleaseDir('3.2');
    initProjectsDir('3.2');

    // add temporary buttons for downloading godot release
    ipcRenderer.on('release-info-client', (event, arg) => {
      const { url, monoOS, OS, version } = arg;

      // godot button
      const downloadGodot = document.querySelector('#download-godot');
      const godotProgress = document.querySelector('#godot-progress');

      downloadGodot.addEventListener('click', () => {
        getGodotURL(url, OS);
      });

      ipcRenderer.on('getGodot-progress', (event, arg) => {
        godotProgress.value += parseInt(arg);
      });

      // export templates button
      const downloadExportTemplates = document.querySelector('#download-export-templates');
      const exportTemplatesProgress = document.querySelector('#export-templates-progress');

      downloadExportTemplates.addEventListener('click', () => {
        getExportTemplatesURL(url);
      });

      ipcRenderer.on('getExportTemplates-progress', (event, arg) => {
        exportTemplatesProgress.value += parseInt(arg);
      });

      // mono button
      const downloadMono = document.querySelector('#download-mono');
      const monoProgress = document.querySelector('#mono-progress');

      downloadMono.addEventListener('click', () => {
        getMonoURL(url, monoOS, version);
      });

      ipcRenderer.on('getMono-progress', (event, arg) => {
        monoProgress.value += parseInt(arg);
      });

      // mono export templates button
      const downloadMonoExportTemplates = document.querySelector('#download-mono-export-templates');
      const monoExportTemplatesProgress = document.querySelector('#mono-export-templates-progress');

      downloadMonoExportTemplates.addEventListener('click', () => {
        getMonoExportTemplatesURL(url, version);
      });

      ipcRenderer.on('getMonoExportTemplates-progress', (event, arg) => {
        monoExportTemplatesProgress.value += parseInt(arg);
      });
    });

    console.log(`versions: ${JSON.stringify(sort, null, 2)}`);
    console.log(`getScraped: ${getScraped}`);
  } catch (e) {
    console.error(new Error(e));
  }
})();
