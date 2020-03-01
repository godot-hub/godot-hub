const fs = require('fs');
const path = require('path');
const process = require('process');

// create a sc file for a specific release version if it doesn't exist
const initScFile = (version) => {
  const dirPath = path.join(process.cwd(), 'Godot Hub', version, 'Engine', '_sc_');

  if (!fs.existsSync(dirPath)) {
    fs.writeFileSync(dirPath, '');
  }
};

module.exports = initScFile;
