const { ipcRenderer } = require('electron');

const body = document.querySelector('#godot-hub');

// title - <h1>Godot Hub</h1>
const title = document.createElement('h1');
title.textContent = 'Godot Hub';

const elements = `
  <article>
    <label>Godot</label>
    <input id="download-godot" type="button" value="Download">
    <progress id="godot-progress" max="100" value="0">0%</progress>
  </article>
  <br>
  <article>
    <label>Export Templates</label>
    <input id="download-export-templates" type="button" value="Download">
    <progress id="export-templates-progress" max="100" value="0">0%</progress>
  </article>
  <br>
  <article>
    <label>Mono</label>
    <input id="download-mono" type="button" value="Download">
    <progress id="mono-progress" max="100" value="0">0%</progress>
  </article>
  <br>
  <article>
    <label>Mono Export Templates</label>
    <input id="download-mono-export-templates"  type="button" value="Download">
    <progress id="mono-export-templates-progress" max="100" value="0">0%</progress>
  </article>
  <br>
  <article>
    <label>Install Export Templates</label>
    <input id="install-export-templates"  type="button" value="Download">
  </article>
  <br>
  <article>
    <label>Install Mono Export Templates</label>
    <input id="install-mono-export-templates"  type="button" value="Download">
  </article>
  <br>
  <article>
    <label>Choose godot project</label>
    <br>
    <label>Project Path</label>
    <input id="open-project-input" type="file" accept=".godot, .cfg" name="Project Path">
    <br>
    <label>Godot Path</label>
    <input id="open-godot-input" type="file" name="Godot Path">
    <br>
    <input id="open-project" type="button" value="open">
  </article>
`;

body.appendChild(title);
body.insertAdjacentHTML('beforeend', elements);

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
    const initEngineDir = require('./helpers/Init/initEngineDir');
    const getGodotURL = require('./helpers/URL/getGodotURL');
    const getExportTemplatesURL = require('./helpers/URL/getExportTemplatesURL');
    const getMonoURL = require('./helpers/URL/getMonoURL');
    const getMonoExportTemplatesURL = require('./helpers/URL/getMonoExportTemplatesURL');

    const releases = await fetchReleases();
    const filter = await filterReleases(releases);
    const sort = await sortReleases(filter);
    const scrap = scrapURL('https://downloads.tuxfamily.org/godotengine/3.2/', '3.2');
    const getScraped = getScrapedURL();

    console.log(`versions: ${JSON.stringify(sort, null, 2)}`);
    console.log(`getScraped: ${getScraped}`);

    initGodotHubDir();
    initReleaseDir('3.2');
    initProjectsDir('3.2');
    initEngineDir('3.2');

    // add temporary buttons for downloading godot release
    ipcRenderer.on('release-info-client', (event, arg) => {
      const { url, monoOS, OS, version } = arg;

      // godot button
      const downloadGodot = document.querySelector('#download-godot');
      const godotProgress = document.querySelector('#godot-progress');

      downloadGodot.addEventListener('click', () => {
        getGodotURL(url, OS, version);
      });

      ipcRenderer.on('getGodot-progress', (event, arg) => {
        godotProgress.value += parseInt(arg);
      });

      // export templates button
      const downloadExportTemplates = document.querySelector('#download-export-templates');
      const exportTemplatesProgress = document.querySelector('#export-templates-progress');

      downloadExportTemplates.addEventListener('click', () => {
        getExportTemplatesURL(url, true);
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
        getMonoExportTemplatesURL(url, version, monoOS, true);
      });

      ipcRenderer.on('getMonoExportTemplates-progress', (event, arg) => {
        monoExportTemplatesProgress.value += parseInt(arg);
      });

      // install export templates
      const installExportTemplates = document.querySelector('#install-export-templates');

      installExportTemplates.addEventListener('click', () => {
        getExportTemplatesURL(url, false, version);
      });

      // install mono export templates
      const installMonoExportTemplates = document.querySelector('#install-mono-export-templates');

      installMonoExportTemplates.addEventListener('click', () => {
        getMonoExportTemplatesURL(url, version, monoOS);
      });

      // open godot project
      const openProjectInput = document.querySelector('#open-project-input');
      const openGodotInput = document.querySelector('#open-godot-input');
      const openProjectBtn = document.querySelector('#open-project');
      const openProject = require('./helpers/Project/openProject');

      openProjectBtn.addEventListener('click', () => {
        if (openProjectInput.files[0] && openGodotInput.files[0]) {
          const { name: projectName, path: projectFullPath } = openProjectInput.files[0];
          const { name: godotName, path: godotPath } = openGodotInput.files[0];

          const projectPath = projectFullPath.slice(0, projectFullPath.lastIndexOf('/')) || projectFullPath.slice(0, projectFullPath.lastIndexOf('\\'));

          if ((projectName && godotName) && (projectPath && godotPath) && (projectName === 'project.godot' || projectName === 'engine.cfg') && (godotName.includes('Godot'))) {
            console.log(projectName);
            console.log(projectPath);
            console.log(godotName);
            console.log(godotPath);
            openProject(version, projectPath, godotPath);
          } else {
            console.log('incorrect file type');
          }
        } else {
          console.log('no file selected');
        }
      });
    });
  } catch (e) {
    console.error(new Error(e));
  }
})();
