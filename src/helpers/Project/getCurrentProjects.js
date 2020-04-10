const path = require('path');
const fs = require('fs');

// get a list of the current godot projects
const getcurrentProjects = (godotHubPath) => {
  const releasesPath = path.join(godotHubPath, 'Releases');

  if (fs.existsSync(releasesPath)) {
    const releases = fs.readdirSync(releasesPath);

    const projects = releases.map(release => {
      const releaseVersion = parseInt(release[0]);

      const projectPath = path.join(releasesPath, release, 'Projects');

      if (fs.existsSync(projectPath)) {
        const currentProjects = fs.readdirSync(projectPath).map(currentProject => {
          const currentProjectFiles = fs.readdirSync(path.join(releasesPath, release, 'Projects', currentProject));

          // only return valid projects depending on their release version
          if (releaseVersion < 3) {
            if (currentProjectFiles.includes('engine.cfg')) {
              return {
                name: currentProject,
                version: release,
                projectPath: path.join(releasesPath, release, 'Projects', currentProject),
                filePath: path.join(releasesPath, release, 'Projects', currentProject, 'engine.cfg')
              };
            }
          } else {
            if (currentProjectFiles.includes('project.godot')) {
              return {
                name: currentProject,
                version: release,
                projectPath: path.join(releasesPath, release, 'Projects', currentProject),
                filePath: path.join(releasesPath, release, 'Projects', currentProject, 'project.godot')
              };
            }
          }
        });

        return currentProjects;
      }
    });

    console.log(projects);
  }
};

module.exports = getcurrentProjects;
