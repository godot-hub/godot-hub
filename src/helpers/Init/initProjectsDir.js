const fs = require('fs');
const path = require('path');
const process = require('process');

// create a projects directory for a specific release version if it doesn't exist
const initProjectsDir = (godotHubPath, version) => {
  const dirPath = path.join(godotHubPath, 'Releases', version, 'Projects');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initProjectsDir;
