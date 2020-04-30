const getCurrentProjects = require('../../helpers/Project/getCurrentProjects');
const renderProjects = require('./renderProjects');

// render create project dialog
const renderCreateProject = (godotHubPath) => {
  const body = document.querySelector('body');
  const createProjectbutton = document.querySelector('#create-project');

  createProjectbutton.addEventListener('click', () => {
    const createProjectParentElement = document.createElement('section');
    createProjectParentElement.setAttribute('id', 'create-project-parent');
    body.insertBefore(createProjectParentElement, document.querySelector('#projects-body').nextSibling);

    const createProjectDialog = document.createElement('section');
    createProjectDialog.setAttribute('id', 'create-project-dialog');
    createProjectParentElement.appendChild(createProjectDialog);

    const createProjectHeader = document.createElement('h1');
    const createProjectHeaderText = document.createTextNode('Create new project');
    createProjectHeader.appendChild(createProjectHeaderText);
    createProjectDialog.appendChild(createProjectHeader);

    const createProjectBody = document.createElement('section');
    createProjectBody.setAttribute('id', 'create-project-body');
    createProjectDialog.appendChild(createProjectBody);

    const inputs = document.createElement('section');
    inputs.setAttribute('id', 'inputs');
    createProjectBody.appendChild(inputs);

    const nameParent = document.createElement('div');
    inputs.appendChild(nameParent);

    const projectNameLabel = document.createElement('label');
    const projectNameLabelText = document.createTextNode('Project name');
    projectNameLabel.setAttribute('for', 'project-name-input');
    projectNameLabel.appendChild(projectNameLabelText);
    nameParent.appendChild(projectNameLabel);

    const projectNameInput = document.createElement('input');
    projectNameInput.setAttribute('type', 'text');
    projectNameInput.setAttribute('id', 'project-name-input');
    nameParent.appendChild(projectNameInput);

    const warningElement = document.createElement('p');
    warningElement.setAttribute('class', 'warning');
    nameParent.appendChild(warningElement);

    projectNameInput.addEventListener('keydown', () => {
      warningElement.textContent = '';
    });

    const versionParent = document.createElement('div');
    inputs.appendChild(versionParent);

    const projectGodotVersionLabel = document.createElement('label');
    const projectGodotVersionLabelText = document.createTextNode('Project godot version');
    projectGodotVersionLabel.setAttribute('for', 'project-godot-version-input');
    projectGodotVersionLabel.appendChild(projectGodotVersionLabelText);
    versionParent.appendChild(projectGodotVersionLabel);

    const projectGodotVersionInput = document.createElement('select');
    projectGodotVersionInput.setAttribute('id', 'project-godot-version-input');
    versionParent.appendChild(projectGodotVersionInput);

    const getInstalledReleases = require('../../helpers/Releases/getInstalledReleases');
    const installedReleases = getInstalledReleases(godotHubPath);

    // show installed versions when selecting project godot version
    if (installedReleases.length > 0) {
      installedReleases.forEach(release => {
        const currentOption = document.createElement('option');
        const currentOptionText = document.createTextNode(release);
        currentOption.appendChild(currentOptionText);
        projectGodotVersionInput.appendChild(currentOption);
      });
    } else {
      const currentOption = document.createElement('option');
      const currentOptionText = document.createTextNode('No installed version yet');
      currentOption.appendChild(currentOptionText);
      projectGodotVersionInput.appendChild(currentOption);
    }

    const buttons = document.createElement('section');
    buttons.setAttribute('id', 'buttons');
    createProjectBody.appendChild(buttons);

    const cancelButton = document.createElement('button');
    const cancelButtonText = document.createTextNode('Cancel');
    cancelButton.setAttribute('class', 'cancel');
    cancelButton.appendChild(cancelButtonText);
    buttons.appendChild(cancelButton);

    // cancel button
    cancelButton.addEventListener('click', () => {
      body.removeChild(createProjectParentElement);
    });

    // create project button
    const createProjectbuttonElement = document.createElement('button');
    const createProjectbuttonText = document.createTextNode('Create project');
    createProjectbuttonElement.setAttribute('class', 'create');
    createProjectbuttonElement.appendChild(createProjectbuttonText);
    buttons.appendChild(createProjectbuttonElement);

    // create project
    createProjectbuttonElement.addEventListener('click', () => {
      const projectName = projectNameInput.value.trim();
      const projectGodotVersion = projectGodotVersionInput.value;

      if (projectName.length > 3) {
        const currentProjects = getCurrentProjects(godotHubPath).flat();

        // check if project name exists
        const projectExists = currentProjects.map(currentProject => {
          const { name } = currentProject;
          if (projectName === name) {
            return true;
          }
        });

        console.log(projectExists);
        console.log(projectExists.includes(true));

        if (projectExists.includes(true)) {
          warningElement.textContent = 'Project name exists';
        } else {
          const createProject = require('../../helpers/Project/createProject');
          createProject(godotHubPath, projectName, projectGodotVersion);
          body.removeChild(createProjectParentElement);
          renderProjects(godotHubPath);
        }
      } else {
        // show warning for short project name
        if (projectName.length === 0) {
          warningElement.textContent = 'Project name can\'t be empty';
        } else {
          warningElement.textContent = 'Project name is too short';
        }
      }

      console.log(projectName);
      console.log(projectGodotVersion);
    });
  });
};

module.exports = renderCreateProject;
