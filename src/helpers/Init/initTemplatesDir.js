const fs = require('fs');
const path = require('path');

// create a templates directory for a specific release version if it doesn't exist
const initTemplatesDir = (godotHubPath, version, mono, monoDir) => {
  let dirPath;

  if (mono) {
    dirPath = path.join(godotHubPath, 'Releases', version, 'Engine', monoDir, 'editor_data', 'templates');
  } else {
    dirPath = path.join(godotHubPath, 'Releases', version, 'Engine', 'editor_data', 'templates');
  }

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initTemplatesDir;
