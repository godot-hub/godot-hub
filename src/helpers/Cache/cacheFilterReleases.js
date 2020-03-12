const fs = require('fs');
const path = require('path');
const process = require('process');

// cache filter releases and save it to cache directory
const cacheFilterReleases = (releases) => {
  try {
    const cachePath = path.join(process.cwd(), 'Godot-Hub', '.cache');
    const dirPath = path.join(cachePath, 'filterReleases.json');

    if (fs.existsSync(cachePath)) {
      fs.writeFileSync(dirPath, JSON.stringify(releases, null, 2));
    }
  } catch (err) {
    console.error(new Error(err));
  }
};

module.exports = cacheFilterReleases;
