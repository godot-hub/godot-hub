const { ipcRenderer } = require('electron');
const getOSinfo = require('./getOSinfo');
const getMonoURL = require('./getMonoURL');
const getGodotURL = require('./getGodotURL');
const getExportTemplatesURL = require('./getExportTemplatesURL');

// get the result of request for scrapping URL from main process
const getScrappedURL = () => {
  try {
    ipcRenderer.on('scrapURL-response', (event, arg) => {
      const { data, url } = arg;
      // parsing DOM and getting required elements for releases
      const parser = new DOMParser();
      const elements = parser.parseFromString(data, 'application/xhtml+xml');
      const listOfReleases = [...elements.getElementsByClassName('n')].map(n => n.innerHTML);

      // logging
      console.log(`data = ${arg}`);
      console.log(`elements: ${elements}`);
      console.log(`class of n = ${[...elements.getElementsByClassName('n')]}`);
      console.log(`releases = ${listOfReleases}`);
      console.log(`url = ${url}`);

      // get OS and arch info for mono
      let OS = getOSinfo(true);

      console.log(`url: ${url}, OS: ${OS}`);

      // get url of mono and request downloading mono version
      getMonoURL(url, OS);

      // get OS and arch info for godot release
      OS = getOSinfo();

      getGodotURL(url, OS);

      // get export templates url
      getExportTemplatesURL(url);
    });
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = getScrappedURL;
