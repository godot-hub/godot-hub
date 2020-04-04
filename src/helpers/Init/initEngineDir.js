const fs = require('fs');
const path = require('path');

// create a engine directory for a specific release version if it doesn't exist
const initEngineDir = (godotHubPath, version) => {
  const dirPath = path.join(godotHubPath, 'Releases', version, 'Engine');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initEngineDir;
