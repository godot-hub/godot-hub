const path = require('path');
const fs = require('fs');
const getReleaseName = require('../Releases/getReleaseName');

// get a list of the current godot projects
const getcurrentProjects = (godotHubPath) => {
  const releasesPath = path.join(godotHubPath, 'Releases');

  if (fs.existsSync(releasesPath)) {
    const releases = fs.readdirSync(releasesPath);

    const projects = releases.map(release => {
      const releaseVersion = parseInt(release[0]);

      // get godot name
      let godotName;

      if (release.includes('mono')) {
        const godotVersion = release.slice(0, release.indexOf('-'));

        godotName = getReleaseName(godotVersion, 'mono', true);
      } else {
        godotName = getReleaseName(release, 'godot');
      }

      const projectPath = path.join(releasesPath, release, 'Projects');

      if (fs.existsSync(projectPath)) {
        const currentProjects = fs.readdirSync(projectPath).map(currentProject => {
          try {
            const currentProjectFiles = fs.readdirSync(path.join(releasesPath, release, 'Projects', currentProject));

            console.log(currentProjectFiles);

            // only return valid projects depending on their release version
            if (releaseVersion < 3) {
              if (currentProjectFiles.includes('engine.cfg')) {
                return {
                  name: currentProject,
                  version: release,
                  projectPath: path.join(releasesPath, release, 'Projects', currentProject),
                  filePath: path.join(releasesPath, release, 'Projects', currentProject, 'engine.cfg'),
                  godotPath: path.join(releasesPath, release, 'Engine', godotName)
                };
              }
            } else {
              if (currentProjectFiles.includes('project.godot')) {
                if (release.includes('mono')) {
                  return {
                    name: currentProject,
                    version: release,
                    projectPath: path.join(releasesPath, release, 'Projects', currentProject),
                    filePath: path.join(releasesPath, release, 'Projects', currentProject, 'project.godot'),
                    godotPath: path.join(releasesPath, release, 'Engine', godotName.dirName, godotName.fileName)
                  };
                } else {
                  return {
                    name: currentProject,
                    version: release,
                    projectPath: path.join(releasesPath, release, 'Projects', currentProject),
                    filePath: path.join(releasesPath, release, 'Projects', currentProject, 'project.godot'),
                    godotPath: path.join(releasesPath, release, 'Engine', godotName)
                  };
                }
              }
            }
          } catch (err) {
            // ignore error if current read is a file
            if (!String(err).includes('ENOTDIR')) {
              console.error(new Error(err.stack));
            }
          }
        });

        return currentProjects;
      }
    });

    return projects;
  }
};

module.exports = getcurrentProjects;
