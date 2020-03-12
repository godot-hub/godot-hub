const cacheFilterReleases = require('../Cache/cacheFilterReleases');

// filter releases to only include desired info
const filterReleases = (rawReleases) => {
  try {
    // don't include version 1.0-stable as there is no download link for it
    const releases = rawReleases.slice(0, rawReleases.length - 1);
    // filter each release to only include the version & url
    const mappedReleases = releases.map(release => {
      // filtered release values
      const startOfIndex = release.body.indexOf('[Download](') + 11;
      const endOfIndex = release.body.lastIndexOf(')');

      const version = release.name;
      const url = release.body.slice(startOfIndex, endOfIndex);

      return {
        version,
        url
      };
    });
    // cache filter releases
    cacheFilterReleases(mappedReleases);
    // return mapped releases
    return mappedReleases;
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = filterReleases;
