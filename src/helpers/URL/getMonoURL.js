const { ipcRenderer } = require('electron');

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
        return `${url}${targetRelease}`;
      }
    });
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = getMonoURL;
