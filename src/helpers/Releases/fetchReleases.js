const cacheFetchReleases = require('../Cache/cacheFetchReleases');

// get godot releases
const fetchReleases = async (godotHubPath) => {
  const url = 'https://api.github.com/repos/godotengine/godot/releases';

  try {
    const res = await fetch(url);
    const releases = await res.json();
    cacheFetchReleases(releases, godotHubPath);
    return releases;
  } catch (err) {
    console.error(err);
  }
};

module.exports = fetchReleases;
