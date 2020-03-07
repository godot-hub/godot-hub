const execFile = require('child_process').execFile;
const process = require('process');
const path = require('path');

// open godot project based on project and godot path
const openProject = (version, projectPath, godotPath) => {
  const godotHubPath = process.cwd();
  const parsedProjectPath = path.parse(projectPath).dir;

  console.log(process.cwd());

  // change directory to project path
  process.chdir(parsedProjectPath);

  console.log(process.cwd());
  console.log(godotPath);

  // open godot project
  execFile(godotPath, ['-e'], (err, stdout, stderr) => {
    if (err) {
      console.error(new Error(err));
    }
    if (stderr) {
      console.log(stderr);
    }
    console.log(stdout);
  });

  // change directory back to godot hub path
  process.chdir(godotHubPath);
  console.log(godotHubPath);
};

module.exports = openProject;
