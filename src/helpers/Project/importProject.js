const fs = require('fs-extra');
const renderProjects = require('../../components/Projects/renderProjects');

// import a project into godot hub based on its release version and path
const importProject = (src, target, godotHubPath, body, importProjectParentElement) => {
  try {
    fs.copy(src, target, err => {
      if (err) console.error(new Error(err));

      body.removeChild(importProjectParentElement);
      renderProjects(godotHubPath);
    });
  } catch (err) {
    console.error(new Error(err));
  }
};

module.exports = importProject;
