const { ipcRenderer } = require('electron');

// get the godot release version url based on OS and arch
const getGodotURL = (url, OS) => {
  console.log(`getGodotURL url: ${url}, OS: ${OS}`);

  ipcRenderer.send('getMonoURL-request', { url, OS });

  ipcRenderer.on('getMonoURL-response', (event, arg) => {
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
      console.log(`getMonoURL: ${url}${targetRelease}`);
      return `${url}${targetRelease}`;
    }
  });
};

module.exports = getGodotURL;
