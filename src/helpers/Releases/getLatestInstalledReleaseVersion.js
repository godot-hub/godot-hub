const fs = require('fs');

// get latest installed release version from godot hub config file
const getLatestInstalledReleaseVersion = (releaseList, godotHubConfigPath) => {
  const godotHubConfigFile = JSON.parse(fs.readFileSync(godotHubConfigPath));

  // check if last installed version exists in godot hub config file
  if (godotHubConfigFile.hasOwnProperty('lastInstalledVersion')) {
    const lastInstalledVersion = godotHubConfigFile.lastInstalledVersion;

    const defaultRelease = lastInstalledVersion;
    const defaultReleaseIndex = releaseList.indexOf(defaultRelease);

    // allow only valid godot version
    if (defaultReleaseIndex < 0) {
      return;
    }

    const sortedReleaseList = [];

    releaseList.forEach((release) => {
      if (release !== defaultRelease) {
        sortedReleaseList.push(release);
      }
    });

    sortedReleaseList.unshift(releaseList[defaultReleaseIndex]);

    return sortedReleaseList;
  }
};

module.exports = getLatestInstalledReleaseVersion;
