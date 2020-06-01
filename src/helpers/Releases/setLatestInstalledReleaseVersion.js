const fs = require('fs');

// set latest installed release version in godot hub config file
const setLatestInstalledReleaseVersion = (version, godotHubFilePath) => {
  const godotHubConfigFile = JSON.parse(fs.readFileSync(godotHubFilePath));

  godotHubConfigFile.lastInstalledVersion = version;
  fs.writeFileSync(godotHubFilePath, JSON.stringify(godotHubConfigFile, null, 2));
};

module.exports = setLatestInstalledReleaseVersion;
