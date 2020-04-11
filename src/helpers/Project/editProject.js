const execFile = require('child_process').execFile;
const process = require('process');

// edit godot project based on project and godot path
const editProject = (projectPath, godotHubPath, godotPath) => {
  // change directory to project path
  process.chdir(projectPath);

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
};

module.exports = editProject;
