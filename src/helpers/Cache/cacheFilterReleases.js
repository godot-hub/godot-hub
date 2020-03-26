const fs = require('fs');
const path = require('path');

// cache filter releases and save it to cache directory
const cacheFilterReleases = (releases, godotHubPath) => {
  try {
    const cachePath = path.join(godotHubPath, '.cache');
    const dirPath = path.join(cachePath, 'filterReleases.json');

    if (fs.existsSync(cachePath)) {
      fs.writeFileSync(dirPath, JSON.stringify(releases, null, 2));
    }
  } catch (err) {
    console.error(new Error(err));
  }
};

module.exports = cacheFilterReleases;
