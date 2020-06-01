// sort release list to make sure the selected default release version is in first index
const getSelectedRelease = (releaseList, defaultGodotVersion) => {
  const defaultReleaseIndex = releaseList.lastIndexOf(defaultGodotVersion);

  const sortedReleaseList = [];

  releaseList.forEach(release => {
    if (release === releaseList[defaultReleaseIndex]) {
      sortedReleaseList.unshift(release);
    } else {
      sortedReleaseList.push(release);
    }
  });

  return sortedReleaseList;
};

module.exports = getSelectedRelease;
