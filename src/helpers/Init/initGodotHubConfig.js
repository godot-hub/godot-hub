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
  } else {
    // current godot hub path
    const currentGodotHubConfigPath = path.join(process.cwd(), 'godot-hub.json');
    const currentGodotHubPath = JSON.parse(fs.readFileSync(currentGodotHubConfigPath)).godotHubPath;

    // change godot hub path only if new path is different
    if (String(currentGodotHubPath) !== String(godotHubPath)) {
      const godotHubFile = fs.readFileSync(godotHubConfigPath);

      // modify godot hub path if godot hub key exists
      godotHubFile.godotHubPath = godotHubConfigPath;
      fs.writeFileSync(godotHubConfigPath, JSON.stringify(godotHubConfig, null, 2));
    }
  }
};

module.exports = initGodotHubConfig;
