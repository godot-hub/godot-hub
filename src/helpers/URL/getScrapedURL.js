const { ipcRenderer } = require('electron');
const getOSinfo = require('../getOSinfo');
const getMonoURL = require('./getMonoURL');
const getGodotURL = require('./getGodotURL');
const getExportTemplatesURL = require('./getExportTemplatesURL');
const getMonoExportTemplatesURL = require('./getMonoExportTemplatesURL');

// get the result of request for scrapping URL from main process
const getScrappedURL = () => {
  try {
    ipcRenderer.on('scrapURL-response', (event, arg) => {
      const { data, url, version } = arg;
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
      const monoOS = getOSinfo(true);
      const OS = getOSinfo();

      console.log(`url: ${url}, OS: ${OS}, version: ${version}`);

      // pass release info to main to get passed to index.js
      ipcRenderer.send('release-info-main', {
        url,
        monoOS,
        OS,
        version
      });
    });
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = getScrappedURL;
