const fs = require('fs-extra');

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
            const search = document.querySelector('#search');

            // clear search bar after deleting project
            if (search.value) {
              search.value = '';
            }

            console.log(godotHubPath);
            const renderProjects = require('../../views/Projects/renderProjects');

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
