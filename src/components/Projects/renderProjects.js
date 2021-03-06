const getCurrentProjects = require('../../helpers/Project/getCurrentProjects');
const confirmDeleteProject = require('./confirmDeleteProject');

// render projects in projects view based on the current valid projects
const renderProjects = (godotHubPath) => {
  // get current projects
  const currentProjectsList = getCurrentProjects(godotHubPath);

  const projectsList = document.querySelector('#projects-list');

  while (projectsList.firstChild) {
    projectsList.removeChild(projectsList.firstChild);
  }

  currentProjectsList.forEach(currentProjects => {
    if (currentProjects && currentProjects.length) {
      currentProjects.forEach(currentProject => {
        // only render valid projects
        if (currentProject) {
          const { name, version, projectPath, filePath, godotPath } = currentProject;

          const project = `<li 
              class="project"
              data-name="${name}"
              data-version="${version}"
              data-project-path="${projectPath}"
              data-file-path="${filePath}"
              data-godot-path="${godotPath}"
            >
            <h2>${name}</h2>
            <h3>${version}</h3>
            <span class="project-options">
              <p class="launch">Launch</p>
              <p class="edit">Edit</p>
              <p class="delete">Delete</p>
            </span>
          </li>`;

          projectsList.insertAdjacentHTML('beforeend', project);
        }
      });
    }
  });

  const projectsOptions = document.querySelectorAll('.project-options');

  projectsOptions.forEach(project => {
    const editElement = project.querySelector('.edit');

    // edit project on click
    editElement.addEventListener('click', (e) => {
      const currentProjectListData = e.target.parentElement.parentElement.dataset;
      const { name, version, projectPath, filePath, godotPath } = currentProjectListData;

      // edit project
      const editProject = require('../../helpers/Project/editProject');
      editProject(projectPath, godotPath);
    });

    // delete project on click
    const deleteElement = project.querySelector('.delete');
    deleteElement.addEventListener('click', (e) => {
      const currentProjectListData = e.target.parentElement.parentElement.dataset;
      const { name, version, projectPath, filePath, godotPath } = currentProjectListData;

      confirmDeleteProject(projectPath, godotHubPath, name);
    });
  });
};

module.exports = renderProjects;
