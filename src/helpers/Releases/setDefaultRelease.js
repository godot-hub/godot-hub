const fs = require('fs');
const path = require('path');

// set default release version in godot hub config
const setDefaultRelease = (godotHubPath, defaultRelease) => {
  const configFilePath = path.join(godotHubPath, '.config', '.config.json');
  const readConfigFile = JSON.parse(fs.readFileSync(configFilePath));

  // check if there is a default release version in the config file
  if (readConfigFile.hasOwnProperty('defaultGodotVersion')) {
    const defaultGodotVersion = readConfigFile.defaultGodotVersion;

    // modify default godot version only if its different
    if (String(defaultGodotVersion) !== String(defaultRelease)) {
      readConfigFile.defaultGodotVersion = defaultRelease;

      fs.writeFileSync(configFilePath, JSON.stringify(readConfigFile, null, 2));
    }
  } else {
    readConfigFile.defaultGodotVersion = defaultRelease;
    fs.writeFileSync(configFilePath, JSON.stringify(readConfigFile, null, 2));
  }
};

module.exports = setDefaultRelease;
