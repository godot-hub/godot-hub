const fs = require('fs-extra');
const renderProjects = require('../../views/Projects/renderProjects');

// import a project into godot hub based on its release version and path
const importProject = (src, target, godotHubPath, body, importProjectParentElement) => {
  try {
    fs.copy(src, target, err => {
      if (err) console.error(new Error(err));

      body.removeChild(importProjectParentElement);

      const search = document.querySelector('#search');
      const searchProject = require('../../views/Projects/searchProject');

      // rerender projects if searching is active when creating or importing a project
      if (search.value.length > 0) {
        searchProject(godotHubPath);
      } else {
        renderProjects(godotHubPath);
      }
    });
  } catch (err) {
    console.error(new Error(err));
  }
};

module.exports = importProject;
