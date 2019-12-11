const { ipcRenderer } = require('electron');

// scrap URL to get important URLs related to a specific godot release
const scrapURL = (URL) => {
  ipcRenderer.send('scrapURL-request', URL);
};

export default scrapURL;
