const fs = require('fs');
const path = require('path');

// create releases directory if it doesn't exist
const initReleasesDir = (godotHubPath) => {
  const dirPath = path.join(godotHubPath, 'Releases');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initReleasesDir;
