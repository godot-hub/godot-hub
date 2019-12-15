// sort releases based on their versions
const sortReleases = (releases) => {
  return releases.reduce((byVersion, release) => {
    const version = release.version[0];
    if (!byVersion[version]) {
      byVersion[version] = [];
    }
    byVersion[version].push(release);
    return byVersion;
  }, {});
};

module.exports = sortReleases;
