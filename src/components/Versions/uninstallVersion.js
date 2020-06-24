const fs = require('fs-extra');
const renderVersions = require('./renderVersions');

// uninstall a specific release's engine directory
const uninstallVersion = (releasePath, godotHubPath, godotHubConfigPath) => {
  try {
    if (fs.existsSync(releasePath)) {
      fs.removeSync(releasePath);
      // rerender if project got deleted
      if (!fs.existsSync(releasePath)) {
        renderVersions(godotHubPath, godotHubConfigPath);
      }
    } else {
      console.log('not working');
    }
  } catch (err) {
    console.error(new Error(err));
  }
};

module.exports = uninstallVersion;
