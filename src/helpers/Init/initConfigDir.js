const fs = require('fs');
const path = require('path');
const process = require('process');

// create a config directory for godot hub if it doesn't exist
const initConfigDir = () => {
  const dirPath = path.join(process.cwd(), 'Godot-Hub', '.config');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initConfigDir;
