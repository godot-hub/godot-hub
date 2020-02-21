const { ipcRenderer } = require('electron');

// return the full url of export templates based on its godot mono version
const getMonoExporTemplatesURL = (url, version) => {
  try {
    console.log(`mono url: ${url}`);

    // stop scrapping if godot version is less than 3
    if (parseInt(version) < 3) {
      console.log('mono export templates are only available in godot starting from version 3');
      return false;
    }

    const monoRequestURL = `${url}mono/`;

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

      // return if release is matching request url
      if (targetRelease) {
        console.log(`getMonoExportTemplatesURL: ${url}${targetRelease}`);
        return `${url}${targetRelease}`;
      }
    });
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = getMonoExporTemplatesURL;
