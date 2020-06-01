const { ipcRenderer } = require('electron');
const getFileNameFromURL = require('../URL/getFileNameFromURL');
const getGodot = require('../Get/getGodot');

// get the godot release version url based on OS and arch
const getGodotURL = (url, OS, version, godotHubPath, godotHubConfigPath) => {
  try {
    console.log(`getGodotURL url: ${url}, OS: ${OS}`);

    ipcRenderer.send('getGodotURL-request', { url, OS });

    ipcRenderer.on('getGodotURL-response', (event, arg) => {
      const { data, url } = arg;

      console.log(`godot data: ${data}`);
      // parsing DOM and getting required elements for releases
      const parser = new DOMParser();
      const elements = parser.parseFromString(data, 'application/xhtml+xml');
      const listOfReleases = [...elements.getElementsByClassName('n')].map(n => n.innerText);
      const targetRelease = listOfReleases.filter(list => list.includes(OS));
      console.log(`target Release: ${targetRelease}`);

      // return if release is matching request url
      if (targetRelease) {
        const godotURL = new URL(targetRelease, url).href;
        const godotFileName = getFileNameFromURL(godotURL);

        console.log(`getGodotURL: ${godotURL}`);

        getGodot(godotURL, godotHubPath, godotFileName, version, godotHubConfigPath);
      }
    });
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = getGodotURL;
