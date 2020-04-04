const fs = require('fs');
const path = require('path');
const os = require('os');
const getReleaseName = require('../Releases/getReleaseName');

// get a list of installed releases
const getInstalledReleases = (godotHubPath) => {
  const releasesPath = path.join(godotHubPath, 'Releases');

  console.log(releasesPath);
  // get installed releases only if releasesPath exists
  if (fs.existsSync(releasesPath)) {
    const releases = fs.readdirSync(releasesPath);

    const filteredReleases = releases.filter(release => {
      console.log(release);

      let releaseName;

      if (release.includes('mono')) {
        const version = release.slice(0, release.indexOf('-'));
        releaseName = getReleaseName(version, 'mono', true);
        const { dirName, fileName } = releaseName;

        let monoPath;

        if (os.platform() === 'darwin') {
          monoPath = path.join(releasesPath, release, 'Engine', dirName, 'Contents', 'MacOS', fileName);
        } else {
          monoPath = path.join(releasesPath, release, 'Engine', dirName, fileName);
        }

        console.log(fs.existsSync(monoPath));
        console.log(monoPath);

        if (fs.existsSync(monoPath)) {
          return release;
        }
      } else {
        releaseName = getReleaseName(release, 'godot');
        console.log(releaseName);

        let godotPath = path.join(releasesPath, release, 'Engine', releaseName);

        if (os.platform() === 'darwin') {
          const { dirName, fileName } = releaseName;

          godotPath = path.join(releasesPath, release, 'Engine', dirName, 'Contents', 'MacOS', fileName);
        } else {
          godotPath = path.join(releasesPath, release, 'Engine', releaseName);
        }

        console.log(fs.existsSync(godotPath));
        console.log(godotPath);

        if (fs.existsSync(godotPath)) {
          return release;
        }
      }
    });

    console.log(filteredReleases);
    return filteredReleases;
  }
};

module.exports = getInstalledReleases;
