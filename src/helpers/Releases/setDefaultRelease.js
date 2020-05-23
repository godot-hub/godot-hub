const fs = require('fs');

// set default release version in godot hub config
const setDefaultRelease = (godotHubFilePath, defaultRelease) => {
  const godotHubConfigFile = JSON.parse(fs.readFileSync(godotHubFilePath));

  console.log(godotHubConfigFile.hasOwnProperty('defaultGodotVersion'));

  // check if there is a default release version in the config file
  if (godotHubConfigFile.hasOwnProperty('defaultGodotVersion')) {
    const defaultGodotVersion = godotHubConfigFile.defaultGodotVersion;

    // modify default godot version only if its different
    if (String(defaultGodotVersion) !== String(defaultRelease)) {
      godotHubConfigFile.defaultGodotVersion = defaultRelease;

      fs.writeFileSync(godotHubFilePath, JSON.stringify(godotHubConfigFile, null, 2));
    }
  } else {
    godotHubConfigFile.defaultGodotVersion = defaultRelease;
    fs.writeFileSync(godotHubFilePath, JSON.stringify(godotHubConfigFile, null, 2));
  }
};

module.exports = setDefaultRelease;
