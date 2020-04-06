const getGodotURL = require('../../helpers/URL/getGodotURL');
const getMonoURL = require('../../helpers/URL/getMonoURL');
const getOSinfo = require('../../helpers/getOSinfo');

// install godot version, show download progress & stop download button
const installGodotVersion = (parent, type, url, version, godotHubPath) => {
  if (type === 'mono') {
    const OS = getOSinfo(true);

    getMonoURL(url, OS, version, godotHubPath);
  } else {
    const OS = getOSinfo();

    getGodotURL(url, OS, version, godotHubPath);
  }
};

module.exports = installGodotVersion;
