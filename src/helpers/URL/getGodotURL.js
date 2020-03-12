const { ipcRenderer } = require('electron');
const path = require('path');
const getFileNameFromURL = require('../URL/getFileNameFromURL');
const getGodot = require('../Get/getGodot');

// get the godot release version url based on OS and arch
const getGodotURL = (url, OS, version) => {
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
        console.log(`getGodotURL: ${url}${targetRelease}`);

        const godotURL = `${url}${targetRelease}`;
        const godotPath = path.join('Godot-Hub', 'Releases', '3.2');
        const godotFileName = getFileNameFromURL(godotURL);

        getGodot(godotURL, godotPath, godotFileName, version);
      }
    });
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = getGodotURL;
