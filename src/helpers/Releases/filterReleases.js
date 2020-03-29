const path = require('path');
const cacheFilterReleases = require('../Cache/cacheFilterReleases');

// filter releases to only include desired info
const filterReleases = (rawReleases, godotHubPath) => {
  try {
    // don't include version 1.0-stable as there is no download link for it
    const releases = rawReleases.slice(0, rawReleases.length - 1);

    // keep track of filtered releases
    let filteredReleases = [];

    // loop over releases to filter out required data
    for (let i = 0; i < releases.length; i++) {
      const startOfIndex = releases[i].body.indexOf('[Download](') + 11;
      const endOfIndex = releases[i].body.lastIndexOf(')');

      let name;
      let version;
      let url;

      // include mono if last index version value is at least 3
      if (releases[i].name[0] >= 3) {
        // normal releases
        name = releases[i].name.slice(0, releases[i].name.indexOf('-'));
        version = releases[i].name;
        url = releases[i].body.slice(startOfIndex, endOfIndex);

        filteredReleases.push({
          name,
          version,
          url
        });

        // mono releases
        const monoName = `${releases[i].name.slice(0, releases[i].name.indexOf('-'))}-mono`;
        const monoVersion = `${releases[i].name}-mono`;
        const monoUrl = path.join(releases[i].body.slice(startOfIndex, endOfIndex), 'mono');

        const monoReleases = {
          name: monoName,
          version: monoVersion,
          url: monoUrl
        };

        filteredReleases.push(monoReleases);
      } else {
        name = releases[i].name.slice(0, releases[i].name.indexOf('-'));
        version = releases[i].name;
        url = releases[i].body.slice(startOfIndex, endOfIndex);

        filteredReleases.push({
          name,
          version,
          url
        });
      }
    }

    // cache filtered and mono releases
    cacheFilterReleases(filteredReleases, godotHubPath);
    // return filtered and mono releases
    return filteredReleases;
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = filterReleases;
