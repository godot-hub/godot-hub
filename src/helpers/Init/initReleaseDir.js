const fs = require('fs');

// create directory based on release version if it doesn't exist
const initReleaseDir = (version) => {
  if (!fs.existsSync(`Godot Hub/${version}`)) {
    fs.mkdirSync(`Godot Hub/${version}`);
  }
};

module.exports = initReleaseDir;
