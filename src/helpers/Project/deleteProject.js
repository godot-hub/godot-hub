const fs = require('fs-extra');
const renderProjects = require('../../components/Projects/renderProjects');

// delete project based on its path
const deleteProject = (projectPath, godotHubPath) => {
  console.log(projectPath);
  try {
    if (fs.existsSync(projectPath)) {
      fs.remove(projectPath, err => {
        console.log(projectPath);
        if (err) {
          console.error(new Error(err));
        } else {
          // rerender if project got deleted
          if (!fs.existsSync(projectPath)) {
            console.log(godotHubPath);
            renderProjects(godotHubPath);
          }
        }
      });
    }
  } catch (err) {
    console.error(new Error(err));
  }
};

module.exports = deleteProject;
