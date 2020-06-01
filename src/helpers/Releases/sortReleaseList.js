const getDefaultRelease = require('../Releases/getDefaultRelease');
const getNewestGodotRelease = require('../Releases/getNewestGodotRelease');
const getNewestMonoRelease = require('../Releases/getNewestMonoRelease');
const getOldestGodotRelease = require('../Releases/getOldestGodotRelease');
const getOldestMonoRelease = require('../Releases/getOldestMonoRelease');
const getSelectedRelease = require('../Releases/getSelectedRelease');
const getLatestInstalledReleaseVersion = require('./getLatestInstalledReleaseVersion');

// sort release list based on default godot version
const sortReleaseList = (releaseList, godotHubConfigPath) => {
  const defaultGodotVersion = getDefaultRelease(godotHubConfigPath);

  if (!defaultGodotVersion) {
    return false;
  }

  switch (defaultGodotVersion) {
    case 'Last Installed Version':
      return getLatestInstalledReleaseVersion(releaseList, godotHubConfigPath);
    case 'Newest Godot Version':
      return getNewestGodotRelease(releaseList);
    case 'Newest Mono Version':
      return getNewestMonoRelease(releaseList);
    case 'Oldest Godot Version':
      return getOldestGodotRelease(releaseList);
    case 'Oldest Mono Version':
      return getOldestMonoRelease(releaseList);
    default:
      return getSelectedRelease(releaseList, defaultGodotVersion);
  }
};

module.exports = sortReleaseList;
