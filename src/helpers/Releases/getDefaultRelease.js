const fs = require('fs');

// get default release version from godot hub config file
const getDefaultRelease = (godotHubConfigPath) => {
  const godotHubConfigFile = JSON.parse(fs.readFileSync(godotHubConfigPath));

  // check if default godot version exists in godot hub config file
  if (godotHubConfigFile.hasOwnProperty('defaultGodotVersion')) {
    const defaultGodotVersion = godotHubConfigFile.defaultGodotVersion;

    return defaultGodotVersion;
  }
};

module.exports = getDefaultRelease;
