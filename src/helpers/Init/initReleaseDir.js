const fs = require('fs');
const path = require('path');
const process = require('process');

// create directory based on release version if it doesn't exist
const initReleaseDir = (godotHubPath, version) => {
  const dirPath = path.join(godotHubPath, 'Releases', version);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initReleaseDir;
