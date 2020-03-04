const fs = require('fs');
const path = require('path');
const process = require('process');

// create a templates directory for a specific release version if it doesn't exist
const initTemplatesDir = (version, monoDir = false) => {
  if (monoDir) {
    const dirPath = path.join(process.cwd(), 'Godot Hub', version, 'Engine', monoDir, 'editor_data', 'templates');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
  } else {
    const dirPath = path.join(process.cwd(), 'Godot Hub', version, 'Engine', 'editor_data', 'templates');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
  }
};

module.exports = initTemplatesDir;
