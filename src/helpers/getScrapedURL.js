const { ipcRenderer } = require('electron');

// get the result of request for scrapping URL from main process
const getScrappedURL = () => {
  ipcRenderer.on('scrapURL-response', (event, arg) => {
    // parsing DOM and getting required elements for releases
    const parser = new DOMParser();
    const elements = parser.parseFromString(arg, 'application/xhtml+xml');
    const listOfReleases = elements.querySelectorAll('.n').forEach(n => console.log(n.outerHTML));

    // logging
    console.log(`data = ${arg}`);
    console.log(`elements: ${elements}`);
    console.log(`class of n = ${elements.querySelectorAll('.n')}`);
    console.log(`releases = ${listOfReleases}`);
  });
};

module.exports = getScrappedURL;
