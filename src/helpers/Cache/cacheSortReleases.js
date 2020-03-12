const fs = require('fs');
const path = require('path');
const process = require('process');

// cache sort releases and save it to cache directory
const cacheSortReleases = (releases) => {
  try {
    const cachePath = path.join(process.cwd(), 'Godot-Hub', '.cache');
    const dirPath = path.join(cachePath, 'sortReleases.json');

    if (fs.existsSync(cachePath)) {
      fs.writeFileSync(dirPath, JSON.stringify(releases, null, 2));
    }
  } catch (err) {
    console.error(new Error(err));
  }
};

module.exports = cacheSortReleases;
