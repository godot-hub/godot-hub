const path = require('path');
const fs = require('fs');

// create a godot project based on its name and version
const createProject = (godotHubPath, name, version) => {
  const projectPath = path.join(godotHubPath, 'Releases', version, 'Projects', name);

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }

  if (version[0] < 3) {
    const engineConfigPath = path.join(projectPath, 'engine.cfg');

    if (!fs.existsSync(engineConfigPath)) {
      fs.writeFileSync(engineConfigPath, '');
    }
  } else {
    const godotProjectPath = path.join(projectPath, 'project.godot');

    console.log(godotProjectPath);

    if (!fs.existsSync(godotProjectPath)) {
      fs.writeFileSync(godotProjectPath, '');
    }
  }
};

module.exports = createProject;
