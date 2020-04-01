const fs = require('fs');
const path = require('path');

// create an editor data directory for a specific release version if it doesn't exist
const initEditorDataDir = (godotHubPath, version) => {
  const dirPath = path.join(godotHubPath, 'Releases', version, 'Engine', 'editor_data');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initEditorDataDir;
