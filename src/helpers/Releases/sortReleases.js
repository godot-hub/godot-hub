const cacheSortReleases = require('../Cache/cacheSortReleases');

// sort releases based on their versions
const sortReleases = (releases, godotHubPath) => {
  try {
    // group releases by version
    const currentReleases = releases.reduce((byVersion, release) => {
      const version = release.version[0];
      if (!byVersion[version]) {
        byVersion[version] = [];
      }
      byVersion[version].push(release);
      return byVersion;
    }, {});

    // sort sub releases
    const reveresedSubVersions = [];

    for (const releaseGroup in currentReleases) {
      const sortedReleaseGroup = currentReleases[releaseGroup].sort((a, b) => {
        const aVersion = a.version.split('.');
        const bVersion = b.version.split('.');

        for (let i = 0; i < aVersion.length; i++) {
          if (parseInt(aVersion[i]) > parseInt(bVersion[i])) {
            return -1;
          } else if (parseInt(bVersion[i]) > parseInt(aVersion[i])) {
            return 1;
          }
        }
      });
      reveresedSubVersions.push(sortedReleaseGroup);
    }

    // group releases by version after sorting
    const sortedReleases = reveresedSubVersions.reduce((byVersion, release) => {
      const version = release[0].version[0];
      if (!byVersion[version]) {
        byVersion[version] = [];
      }
      byVersion[version].push(release);
      return byVersion;
    }, {});

    // cache sorted releases
    cacheSortReleases(sortedReleases, godotHubPath);
    // return sorted releases
    return sortedReleases;
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = sortReleases;
