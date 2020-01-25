const { ipcRenderer } = require('electron');

// return the full url of export templates based on its godot version
const getExportTemplatesURL = (url) => {
  try {
    console.log(`getExportTemplatesURL url: ${url}`);

    ipcRenderer.send('getExportTemplatesURL-request', { url });

    ipcRenderer.on('getExportTemplatesURL-response', (event, arg) => {
      const { data, url } = arg;

      console.log(`godot data: ${data}`);
      // parsing DOM and getting required elements for releases
      const parser = new DOMParser();
      const elements = parser.parseFromString(data, 'application/xhtml+xml');
      const listOfReleases = [...elements.getElementsByClassName('n')].map(n => n.innerText);
      const targetRelease = listOfReleases.filter(list => list.includes('export_templates.tpz'));
      console.log(`target Release: ${targetRelease}`);

      // return if release is matching request url
      if (targetRelease) {
        console.log(`getExportTemplatesURL: ${url}${targetRelease}`);
        return `${url}${targetRelease}`;
      }
    });
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = getExportTemplatesURL;
