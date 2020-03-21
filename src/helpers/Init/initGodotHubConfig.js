const path = require('path');
const process = require('process');
const fs = require('fs');

// create godot hub config file
const initGodotHubConfig = (godotHubPath) => {
  const godotHubConfigPath = path.join(process.cwd(), 'godot-hub.json');

  // configuration to be written in config file
  const godotHubConfig = {
    godotHubPath
  };

  if (!fs.existsSync(godotHubConfigPath)) {
    fs.writeFileSync(godotHubConfigPath, JSON.stringify(godotHubConfig, null, 2));
  }
};

module.exports = initGodotHubConfig;
