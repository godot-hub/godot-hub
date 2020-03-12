const cacheSortReleases = require('../Cache/cacheSortReleases');

// sort releases based on their versions
const sortReleases = (releases) => {
  try {
    const sortedReleases = releases.reduce((byVersion, release) => {
      const version = release.version[0];
      if (!byVersion[version]) {
        byVersion[version] = [];
      }
      byVersion[version].push(release);
      return byVersion;
    }, {});
    // cache sorted releases
    cacheSortReleases(sortedReleases);
    // return sorted releases
    return sortedReleases;
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = sortReleases;
