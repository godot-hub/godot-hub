const fs = require('fs');
const path = require('path');

// get default release version from godot hub config file
const getDefaultRelease = (godotHubPath) => {
  const configFilePath = path.join(godotHubPath, '.config', '.config.json');

  // check if default godot version exists in godot hub config file
  if (fs.existsSync(configFilePath)) {
    try {
      const readConfigFile = JSON.parse(fs.readFileSync(configFilePath));

      if (readConfigFile.hasOwnProperty('defaultGodotVersion')) {
        const defaultGodotVersion = readConfigFile.defaultGodotVersion;

        return defaultGodotVersion;
      }
    } catch (err) {
      console.log(new Error(err));
    }
  }
};

module.exports = getDefaultRelease;
