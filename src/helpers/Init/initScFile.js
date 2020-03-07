const fs = require('fs');
const path = require('path');
const process = require('process');

// create a sc file for a specific release version if it doesn't exist
const initScFile = (version, monoDir = false) => {
  if (monoDir) {
    const dirPath = path.join(process.cwd(), 'Godot-Hub', version, 'Engine', monoDir, '_sc_');

    if (!fs.existsSync(dirPath)) {
      fs.writeFileSync(dirPath, '');
    }
  } else {
    const dirPath = path.join(process.cwd(), 'Godot-Hub', version, 'Engine', '_sc_');

    if (!fs.existsSync(dirPath)) {
      fs.writeFileSync(dirPath, '');
    }
  }
};

module.exports = initScFile;
