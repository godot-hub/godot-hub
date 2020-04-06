const fs = require('fs');
const path = require('path');

// create a sc file for a specific release version if it doesn't exist
const initScFile = (godotHubPath, version, mono = false, monoDir = '') => {
  let dirPath;

  if (mono) {
    dirPath = path.join(godotHubPath, 'Releases', version, 'Engine', monoDir, '_sc_');
  } else {
    dirPath = path.join(godotHubPath, 'Releases', version, 'Engine', '_sc_');
  }

  if (!fs.existsSync(dirPath)) {
    fs.writeFileSync(dirPath, '');
  }
};

module.exports = initScFile;
