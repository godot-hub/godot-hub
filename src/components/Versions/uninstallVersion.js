const fs = require('fs');
const path = require('path');
const renderVersions = require('./renderVersions');

// uninstall a specific release's engine directory
const uninstallVersion = (releasePath, godotHubPath) => {
  try {
    if (fs.existsSync(releasePath)) {
      fs.readdirSync(releasePath).forEach((file) => {
        const curPath = path.join(releasePath, String(file));
        if (fs.lstatSync(curPath).isDirectory()) {
          uninstallVersion(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });

      fs.rmdirSync(releasePath);

      // rerender if release got uninstalled
      if (!fs.existsSync(releasePath)) {
        renderVersions(godotHubPath);
      }
    }
  } catch (err) {
    console.error(new Error(err));
  }
};

module.exports = uninstallVersion;
