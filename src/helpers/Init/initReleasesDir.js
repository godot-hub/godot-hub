const fs = require('fs');
const path = require('path');
const process = require('process');

// create releases directory if it doesn't exist
const initReleasesDir = () => {
  const dirPath = path.join(process.cwd(), 'Godot-Hub', 'Releases');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initReleasesDir;
