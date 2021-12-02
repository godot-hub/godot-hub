const { exec } = require('child_process');
const process = require('process');

// edit godot project based on project and godot path
const editProject = (projectPath, godotPath) => {
  // get current path to switch to after opening the project
  const currentPath = process.cwd();

  // change directory to project path
  process.chdir(projectPath);

  // open godot project
  exec(`"${godotPath}" -e`, (err, stdout, stderr) => {
    if (err) {
      console.error(new Error(err));
    }
    if (stderr) {
      console.log(stderr);
    }
    if (stdout) {
      console.log(stdout);
    }
  });

  // change directory back to godot hub path
  process.chdir(currentPath);
};

module.exports = editProject;
