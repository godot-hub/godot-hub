const fs = require('fs');
const path = require('path');

// create a cache directory for godot hub if it doesn't exist
const initCacheDir = (godotHubPath) => {
  const dirPath = path.join(godotHubPath, '.cache');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initCacheDir;
