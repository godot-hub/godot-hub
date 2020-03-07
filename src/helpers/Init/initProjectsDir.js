const fs = require('fs');
const path = require('path');
const process = require('process');

// create a projects directory for a specific release version if it doesn't exist
const initProjectsDir = (version) => {
  const dirPath = path.join(process.cwd(), 'Godot-Hub', version, 'Projects');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initProjectsDir;
