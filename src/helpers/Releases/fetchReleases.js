// get godot releases
const fetchReleases = async () => {
  const url = 'https://api.github.com/repos/godotengine/godot/releases';

  try {
    const releases = await fetch(url);
    return await releases.json();
  } catch (err) {
    console.error(err);
  }
};

module.exports = fetchReleases;
