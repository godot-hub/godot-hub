const execFile = require('child_process').execFile;
const process = require('process');
const path = require('path');

// open godot project based on project and godot path
const openProject = (version, projectPath, godotPath) => {
  const parsedProjectPath = path.parse(projectPath).dir;

  console.log(process.cwd());
  process.chdir(parsedProjectPath);
  console.log(process.cwd());
  console.log(godotPath);
  execFile(godotPath, ['-e'], (err, stdout, stderr) => {
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
