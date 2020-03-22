const fs = require('fs');
const path = require('path');

// create a config directory for godot hub if it doesn't exist
const initConfigDir = (godotHubPath) => {
  const dirPath = path.join(godotHubPath, '.config');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initConfigDir;
