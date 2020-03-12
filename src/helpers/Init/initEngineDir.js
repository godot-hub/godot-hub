const fs = require('fs');
const path = require('path');
const process = require('process');

// create a engine directory for a specific release version if it doesn't exist
const initEngineDir = (version) => {
  const dirPath = path.join(process.cwd(), 'Godot-Hub', 'Releases', version, 'Engine');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initEngineDir;
