// check last release version of godot
// and return true if the last local version is outdated
// or false if both last local version and last godot version are same
const checkLastReleaseVersion = async (lastLocalVersion) => {
  const url = 'https://api.github.com/repos/godotengine/godot/releases';

  try {
    const res = await fetch(url);
    const releases = await res.json();
    const lastRemoteversion = releases[0].name;

    if (lastLocalVersion === lastRemoteversion) {
      console.log(`${lastRemoteversion} is equal to ${lastRemoteversion}`);
      return true;
    } else {
      console.log(`${lastRemoteversion} is not equal to ${lastRemoteversion}`);
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = checkLastReleaseVersion;
