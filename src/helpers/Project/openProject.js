const exec = require('child_process').exec;
const process = require('process');

// open godot project based on project and godot path
const openProject = (version, projectPath, godotPath) => {
  console.log(process.cwd());
  process.chdir(projectPath);
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
