const exec = require('child_process').exec;
const process = require('process');
const os = require('os');
const path = require('path');

// open godot project based on project and godot path
const openProject = (version, projectPath, godotPath) => {
  const parsedProjectPath = path.parse(projectPath).dir;

  console.log(process.cwd());
  process.chdir(parsedProjectPath);
  console.log(process.cwd());
  console.log(godotPath);
  exec(`${godotPath} -e`, (err, stdout, stderr) => {
    if (err) {
      console.error(new Error(err));
    }
    if (stderr) {
      console.log(stderr);
    }
    console.log(stdout);
  });
};

module.exports = openProject;
