const fs = require('fs');
const path = require('path');

// create an internal config file for godot hub if it doesn't exist
const initConfigFile = (godotHubPath) => {
  const filePath = path.join(godotHubPath, '.config', '.config.json');

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
  }
};

module.exports = initConfigFile;
