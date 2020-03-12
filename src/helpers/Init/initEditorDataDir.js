const fs = require('fs');
const path = require('path');
const process = require('process');

// create an editor data directory for a specific release version if it doesn't exist
const initEditorDataDir = (version, monoDir = false) => {
  if (monoDir) {
    const dirPath = path.join(process.cwd(), 'Godot-Hub', 'Releases', version, 'Engine', monoDir, 'editor_data');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
  } else {
    const dirPath = path.join(process.cwd(), 'Godot-Hub', 'Releases', version, 'Engine', 'editor_data');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
  }
};

module.exports = initEditorDataDir;
