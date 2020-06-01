// sort godot release list to make the oldest godot release as the first index
const getOldestGodotRelease = (releaseList) => {
  const godotVersions = releaseList.filter((version) => !version.includes('mono'));

  const oldestGodotVersion = [...godotVersions].sort((a, b) => {
    const aVersion = a.split('.');
    const bVersion = b.split('.');

    if (parseInt(aVersion.length) > parseInt(bVersion.length)) {
      bVersion.push('0');
    } else if (parseInt(bVersion.length) > parseInt(aVersion.length)) {
      aVersion.push('0');
    }

    for (let i = 0; i < aVersion.length; i++) {
      if (parseInt(aVersion[i]) > parseInt(bVersion[i])) {
        return 1;
      } else if (parseInt(bVersion[i]) > parseInt(aVersion[i])) {
        return -1;
      }
    }
  });

  const defaultRelease = oldestGodotVersion[0];
  const defaultReleaseIndex = releaseList.indexOf(defaultRelease);

  const sortedReleaseList = [];

  releaseList.forEach((release) => {
    if (release !== defaultRelease) {
      sortedReleaseList.push(release);
    }
  });

  sortedReleaseList.unshift(releaseList[defaultReleaseIndex]);

  return sortedReleaseList;
};

module.exports = getOldestGodotRelease;
