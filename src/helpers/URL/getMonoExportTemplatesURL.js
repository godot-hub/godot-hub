const { ipcRenderer } = require('electron');
const path = require('path');
const getFileNameFromURL = require('../URL/getFileNameFromURL');
const getMonoExportTemplates = require('../Get/getMonoExportTemplates');
const installMonoExportTemplates = require('../Install/installMonoExportTemplates');

// return the full url of export templates based on its godot mono version
const getMonoExporTemplatesURL = (url, version, OS, download = false) => {
  try {
    console.log(`mono url: ${url}`);

    // stop scrapping if godot version is less than 3
    if (parseInt(version) < 3) {
      console.log('mono export templates are only available in godot starting from version 3');
      return false;
    }

    const monoRequestURL = `${url}mono/`;

    ipcRenderer.send('getMonoURL-request', { url: monoRequestURL, OS });

    ipcRenderer.on('getMonoURL-response', (event, arg) => {
      const { data } = arg;
      const resURL = arg.url;

      console.log(`getMonoURL-response: ${data}, ${resURL}`);
      // parsing DOM and getting required elements for releases
      const monoParser = new DOMParser();
      const monoElements = monoParser.parseFromString(data, 'application/xhtml+xml');
      const monoListOfReleases = [...monoElements.getElementsByClassName('n')].map(n => n.innerText);
      const monoRelease = monoListOfReleases.filter(list => list.includes(OS));

      const monoURL = `${resURL}${monoRelease}`;
      const monoFileName = getFileNameFromURL(monoURL);
      const monoDir = monoFileName.slice(0, -4);

      ipcRenderer.send('getMonoExportTemplatesURL-request', { url: monoRequestURL });

      ipcRenderer.on('getMonoExportTemplatesURL-response', (event, arg) => {
        const { data, url } = arg;

        console.log(`godot data: ${data}`);
        // parsing DOM and getting required elements for releases
        const parser = new DOMParser();
        const elements = parser.parseFromString(data, 'application/xhtml+xml');
        const listOfReleases = [...elements.getElementsByClassName('n')].map(n => n.innerText);
        const targetRelease = listOfReleases.filter(list => list.includes('mono_export_templates.tpz'));
        console.log(`target Release: ${targetRelease}`);

        if (download) {
          // return if release is matching request url
          if (targetRelease) {
            console.log(`getMonoExportTemplatesURL: ${url}${targetRelease}`);

            const monoExportTemplatesURL = `${url}${targetRelease}`;
            const monoExportTemplatesPath = path.join('Godot-Hub', 'Releases', '3.2');
            const monoExportTemplatesFileName = getFileNameFromURL(monoExportTemplatesURL);

            getMonoExportTemplates(monoExportTemplatesURL, monoExportTemplatesPath, monoExportTemplatesFileName, monoDir);
          }
        } else {
          // install export templates
          const installMonoExportTemplatesURL = `${url}${targetRelease}`;

          installMonoExportTemplates(installMonoExportTemplatesURL, version, monoDir);
        }
      });
    });
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = getMonoExporTemplatesURL;
