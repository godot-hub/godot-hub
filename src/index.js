const body = document.querySelector('#godot-hub');

// title - <h1>Godot Hub</h1>
const title = document.createElement('h1');
title.textContent = 'Godot Hub';

body.appendChild(title);

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
    const getFileNameFromURL = require('./helpers/URL/getFileNameFromURL');
    const getGodot = require('./helpers/Get/getGodot');
    const getExportTemplates = require('./helpers/Get/getExportTemplates');
    const getMono = require('./helpers/Get/getMono');
    const getMonoExportTemplates = require('./helpers/Get/getMonoExportTemplates');

    const releases = await fetchReleases();
    const filter = await filterReleases(releases);
    const sort = await sortReleases(filter);
    const scrap = scrapURL('https://downloads.tuxfamily.org/godotengine/3.2/', '3.2');
    const getScraped = getScrapedURL();

    initGodotHubDir();
    initReleaseDir('3.2');
    initProjectsDir('3.2');
    console.log(getFileNameFromURL('https://downloads.tuxfamily.org/godotengine/3.2/mono/Godot_v3.2-stable_mono_export_templates.tpz'));
    console.log(getFileNameFromURL('https://downloads.tuxfamily.org/godotengine/3.2/Godot_v3.2-stable_x11.64.zip'));

    const godotURL = 'https://downloads.tuxfamily.org/godotengine/3.2/Godot_v3.2-stable_x11.64.zip';
    const godotPath = 'Godot Hub/3.2';
    const godotFileName = getFileNameFromURL('https://downloads.tuxfamily.org/godotengine/3.2/Godot_v3.2-stable_x11.64.zip');

    getGodot(godotURL, godotPath, godotFileName);

    const exportTemplatesURL = 'https://downloads.tuxfamily.org/godotengine/3.2/Godot_v3.2-stable_export_templates.tpz';
    const exportTemplatesPath = 'Godot Hub/3.2';
    const exportTemplatesFileName = getFileNameFromURL('https://downloads.tuxfamily.org/godotengine/3.2/Godot_v3.2-stable_export_templates.tpz');

    getExportTemplates(exportTemplatesURL, exportTemplatesPath, exportTemplatesFileName);

    const getMonoURL = 'https://downloads.tuxfamily.org/godotengine/3.2/mono/Godot_v3.2-stable_mono_x11_64.zip';
    const getMonoPath = 'Godot Hub/3.2';
    const getMonoFileName = getFileNameFromURL('https://downloads.tuxfamily.org/godotengine/3.2/mono/Godot_v3.2-stable_mono_x11_64.zip');

    getMono(getMonoURL, getMonoPath, getMonoFileName);

    const getMonoExportTemplatesURL = 'https://downloads.tuxfamily.org/godotengine/3.2/mono/Godot_v3.2-stable_mono_export_templates.tpz';
    const getMonoExportTemplatesPath = 'Godot Hub/3.2';
    const getMonoExportTemplatesFileName = getFileNameFromURL('https://downloads.tuxfamily.org/godotengine/3.2/mono/Godot_v3.2-stable_mono_export_templates.tpz');

    getMonoExportTemplates(getMonoExportTemplatesURL, getMonoExportTemplatesPath, getMonoExportTemplatesFileName);

    console.log(`versions: ${JSON.stringify(sort, null, 2)}`);
    console.log(`getScraped: ${getScraped}`);
  } catch (e) {
    console.error(new Error(e));
  }
})();
