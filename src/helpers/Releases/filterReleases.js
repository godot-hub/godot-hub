const cacheFilterReleases = require('../Cache/cacheFilterReleases');

// filter releases to only include desired info
const filterReleases = (rawReleases, godotHubPath) => {
  try {
    // don't include version 1.0-stable as there is no download link for it
    const releases = rawReleases.slice(0, rawReleases.length - 1);
    // filter each release to only include the version & url
    const mappedReleases = releases.map(release => {
      // filtered release values
      const startOfIndex = release.body.indexOf('[Download](') + 11;
      const endOfIndex = release.body.lastIndexOf(')');

      const name = release.name.slice(0, release.name.indexOf('-'));
      const version = release.name;
      const url = release.body.slice(startOfIndex, endOfIndex);

      return {
        name,
        version,
        url
      };
    });
    // cache filter releases
    cacheFilterReleases(mappedReleases, godotHubPath);
    // return mapped releases
    return mappedReleases;
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = filterReleases;
