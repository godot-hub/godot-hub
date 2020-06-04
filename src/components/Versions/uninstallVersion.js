const fs = require('fs-extra');
const renderVersions = require('./renderVersions');

// uninstall a specific release's engine directory
const uninstallVersion = (releasePath, godotHubPath) => {
  try {
    if (fs.existsSync(releasePath)) {
      fs.remove(releasePath, err => {
        console.log(releasePath);
        if (err) {
          console.error(new Error(err));
        } else {
          // rerender if project got deleted
          if (!fs.existsSync(releasePath)) {
            console.log(godotHubPath);
            renderVersions(godotHubPath);
          }
        }
      });
    }
  } catch (err) {
    console.error(new Error(err));
  }
};

module.exports = uninstallVersion;
