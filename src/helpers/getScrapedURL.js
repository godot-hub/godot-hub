const { ipcRenderer } = require('electron');
const getOSinfo = require('./getOSinfo');
const getMonoURL = require('./getMonoURL');

// get the result of request for scrapping URL from main process
const getScrappedURL = () => {
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
    const OS = getOSinfo(true);

    console.log(`url: ${url}, OS: ${OS}`);

    // get url of mono and request downloading mono version
    getMonoURL(url, OS);
  });
};

module.exports = getScrappedURL;
