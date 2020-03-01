const fs = require('fs');
const path = require('path');
const process = require('process');

// create an editor data directory for a specific release version if it doesn't exist
const initEditorDataDir = (version) => {
  const dirPath = path.join(process.cwd(), 'Godot Hub', version, 'Engine', 'editor_data');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initEditorDataDir;
