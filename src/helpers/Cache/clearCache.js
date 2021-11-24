const path = require('path');
const fs = require('fs');
const FS = require('fs-extra');

// clear godot hub cache on demand
const clearCache = (godotHubPath) => {
  const cachePath = path.join(godotHubPath, '.cache');

  const cachedFiles = fs.readdirSync(cachePath);

  // empty cache directory
  cachedFiles.forEach(async (currentCachedFile) => {
    const cachedFilePath = path.join(cachePath, currentCachedFile);

    try {
      await FS.remove(cachedFilePath);
    } catch (err) {
      console.error(new Error(err));
    }
  });
};

module.exports = clearCache;
