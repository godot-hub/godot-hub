const { ipcRenderer } = require('electron');
const path = require('path');
const getFileNameFromURL = require('../URL/getFileNameFromURL');
const getMono = require('../Get/getMono');

// return the full url of a mono version based on its godot version, OS and arch
const getMonoURL = (url, OS, version) => {
  try {
    console.log(`mono url: ${url}`);
    console.log(`mono OS info: ${OS}`);
    console.log(`godot version: ${version}`);

    // stop scrapping if godot version is less than 3
    if (parseInt(version) < 3) {
      console.log('mono is only available in godot starting from version 3');
      return false;
    }

    const monoRequestURL = `${url}mono/`;

    ipcRenderer.send('getMonoURL-request', { url: monoRequestURL, OS });

    ipcRenderer.on('getMonoURL-response', (event, arg) => {
      const { data, url } = arg;
      console.log(`getMonoURL-response: ${data}, ${url}`);
      // parsing DOM and getting required elements for releases
      const parser = new DOMParser();
      const elements = parser.parseFromString(data, 'application/xhtml+xml');
      const listOfReleases = [...elements.getElementsByClassName('n')].map(n => n.innerText);
      const targetRelease = listOfReleases.filter(list => list.includes(OS));
      console.log(`target Release: ${targetRelease}`);
      console.log(`OS: ${OS}`);

      // return if release is matching request url
      if (targetRelease) {
        console.log(`getMonoURL: ${url}${targetRelease}`);

        const monoURL = `${url}${targetRelease}`;
        const monoPath = path.join('Godot-Hub', '3.2');
        const monoFileName = getFileNameFromURL(monoURL);
        const monoDir = monoFileName.slice(0, -4);

        getMono(monoURL, monoPath, monoFileName, monoDir, version);
      }
    });
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = getMonoURL;
