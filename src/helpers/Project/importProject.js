const fs = require('fs');
const path = require('path');

// import a project into godot hub based on its release version and path
const importProject = (src, target) => {
  try {
    fs.mkdirSync(target);
    const files = fs.readdirSync(src);

    for (let i = 0; i < files.length; i++) {
      const current = fs.lstatSync(path.join(src, files[i]));
      // repeat if its a directory
      if (current.isDirectory()) {
        importProject(path.join(src, files[i]), path.join(target, files[i]));
      } else {
        fs.copyFileSync(path.join(src, files[i]), path.join(target, files[i]));
      }
    }
  } catch (err) {
    console.error(new Error(err));
  }
};

module.exports = importProject;
