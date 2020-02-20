const { ipcRenderer } = require('electron');

// scrap URL to get important URLs related to a specific godot release
const scrapURL = (url, version) => {
  try {
    ipcRenderer.send('scrapURL-request', { url, version });
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = scrapURL;
