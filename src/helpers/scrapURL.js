const { ipcRenderer } = require('electron');

// scrap URL to get important URLs related to a specific godot release
const scrapURL = (URL) => {
  try {
    ipcRenderer.send('scrapURL-request', URL);
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = scrapURL;
