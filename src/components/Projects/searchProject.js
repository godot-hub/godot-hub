const renderProjects = require('./renderProjects');
const search = document.querySelector('#search');

// filter and show projects available that match search text based on project name
const searchProject = (godotHubPath) => {
  if (search.value.length === 0) {
    renderProjects(godotHubPath);
  } else {
    // get current projects
    const getCurrentProjects = require('../../helpers/Project/getCurrentProjects');
    const currentProjectsList = getCurrentProjects(godotHubPath).flat();

    const projectsList = document.querySelector('#projects-list');

    while (projectsList.firstChild) {
      projectsList.removeChild(projectsList.firstChild);
    }

    const filteredProjects = currentProjectsList.filter(project => {
      // include project name, if project exists
      if (project && project.name) {
        return project.name.toLowerCase().includes(search.value);
      }
    });

    if (filteredProjects.length > 0) {
      filteredProjects.forEach(currentProject => {
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

          // delete project
          const deleteProject = require('../../helpers/Project/deleteProject');
          deleteProject(projectPath, godotHubPath);
        });
      });
    } else {
      const noProjectsElement = document.createElement('p');
      noProjectsElement.setAttribute('class', 'empty');
      const noProjectsElementText = document.createTextNode('No projects found');
      noProjectsElement.appendChild(noProjectsElementText);
      projectsList.appendChild(noProjectsElement);
    }
  }
};

module.exports = searchProject;
