const path = require('path');
const fs = require('fs');
const renderVersions = require('../../components/Versions/renderVersions');

// delete project based on its path
const deleteProject = (projectPath, godotHubPath) => {
  try {
    if (fs.existsSync(projectPath)) {
      fs.readdirSync(projectPath).forEach((file) => {
        const curPath = path.join(projectPath, String(file));
        if (fs.lstatSync(curPath).isDirectory()) {
          deleteProject(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });

      fs.rmdirSync(projectPath);

      // rerender if project got deleted
      if (!fs.existsSync(projectPath)) {
        renderVersions(godotHubPath);
      }
    }
  } catch (err) {
    console.error(new Error(err));
  }
};

module.exports = deleteProject;
