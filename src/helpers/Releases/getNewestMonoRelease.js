// sort mono release list to make the newest mono release as the first index
const getNewestMonoRelease = (releaseList) => {
  const monoVersions = releaseList.filter((version) => version.includes('mono'));

  const newestMonoVersion = [...monoVersions].sort((a, b) => {
    const slicedA = a.slice(0, a.indexOf('-'));
    const slicedB = b.slice(0, b.indexOf('-'));
    const aVersion = slicedA.split('.');
    const bVersion = slicedB.split('.');

    console.log(`a length: ${aVersion.length}, b length: ${bVersion.length}`);
    if (parseInt(aVersion.length) > parseInt(bVersion.length)) {
      bVersion.push('0');
    } else if (parseInt(bVersion.length) > parseInt(aVersion.length)) {
      aVersion.push('0');
    }

    console.log(`
    ---------------------------
      version a: ${a}\n
      sliced: ${slicedA}\n
      split: ${aVersion}\n
      
      version b: ${b}\n
      sliced ${slicedB}\n
      split: ${bVersion}\n
    ---------------------------
    `);

    for (let i = 0; i < aVersion.length; i++) {
      if (parseInt(aVersion[i]) > parseInt(bVersion[i])) {
        return -1;
      } else if (parseInt(bVersion[i]) > parseInt(aVersion[i])) {
        return 1;
      }
    }
  });

  const defaultRelease = newestMonoVersion[0];
  const defaultReleaseIndex = releaseList.indexOf(defaultRelease);

  // allow only valid godot version
  if (defaultReleaseIndex < 0) {
    return;
  }

  const sortedReleaseList = [];

  releaseList.forEach((release) => {
    if (release !== defaultRelease) {
      sortedReleaseList.push(release);
    }
  });

  sortedReleaseList.unshift(releaseList[defaultReleaseIndex]);

  return sortedReleaseList;
};

module.exports = getNewestMonoRelease;
