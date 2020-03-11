const fs = require('fs');
const path = require('path');
const process = require('process');

// create a cache directory for godot hub if it doesn't exist
const initCacheDir = () => {
  const dirPath = path.join(process.cwd(), 'Godot-Hub', '.cache');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initCacheDir;
