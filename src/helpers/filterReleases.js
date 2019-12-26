// filter releases to only include desired info
const filterReleases = (rawReleases) => {
  try {
    // don't include version 1.0-stable as there is no download link for it
    const releases = rawReleases.slice(0, rawReleases.length - 1);
    // filter each release to only include the version & url
    return releases.map(release => {
    // filtered release values
      const version = release.name;
      const url = release.body.slice(release.body.indexOf('[Download](') + 11, release.body.length - 1);

      return {
        version,
        url
      };
    });
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = filterReleases;
