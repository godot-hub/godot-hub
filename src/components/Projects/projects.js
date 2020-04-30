const { ipcRenderer } = require('electron');
const dialog = require('electron').remote.dialog;
const path = require('path');
const fs = require('fs');
const back = document.querySelector('#back');
const validateImportProject = require('./validateImportProject');

back.addEventListener('click', () => {
  ipcRenderer.send('navigate', { filePath: './src/components/Index/index.html' });
});

// godot hub path
const godotHubConfigPath = path.join(process.cwd(), 'godot-hub.json');
const godotHubPath = JSON.parse(fs.readFileSync(godotHubConfigPath)).godotHubPath;

// render current projects
const renderProjects = require('./renderProjects');
renderProjects(godotHubPath);

// create project dialog
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

// import project
const importProjectbutton = document.querySelector('#import-project');

importProjectbutton.addEventListener('click', () => {
  const importProjectParentElement = document.createElement('section');
  importProjectParentElement.setAttribute('id', 'import-project-parent');
  body.insertBefore(importProjectParentElement, document.querySelector('#projects-body').nextSibling);

  const importProjectDialog = document.createElement('section');
  importProjectDialog.setAttribute('id', 'import-project-dialog');
  importProjectParentElement.appendChild(importProjectDialog);

  const importProjectHeader = document.createElement('h1');
  const importProjectHeaderText = document.createTextNode('Import existing godot project');
  importProjectHeader.appendChild(importProjectHeaderText);
  importProjectDialog.appendChild(importProjectHeader);

  const importProjectBody = document.createElement('section');
  importProjectBody.setAttribute('id', 'import-project-body');
  importProjectDialog.appendChild(importProjectBody);

  const inputs = document.createElement('section');
  inputs.setAttribute('id', 'inputs');
  importProjectBody.appendChild(inputs);

  const pathParent = document.createElement('div');
  inputs.appendChild(pathParent);

  const projectPathLabel = document.createElement('label');
  const projectPathLabelText = document.createTextNode('Project path');
  projectPathLabel.setAttribute('for', 'project-path-input');
  projectPathLabel.appendChild(projectPathLabelText);
  pathParent.appendChild(projectPathLabel);

  const projectPathParent = document.createElement('span');
  projectPathParent.setAttribute('id', 'project-path-parent');
  pathParent.appendChild(projectPathParent);

  const projectPathInput = document.createElement('input');
  projectPathInput.setAttribute('type', 'text');
  projectPathInput.setAttribute('id', 'project-path-input');
  projectPathInput.disabled = true;
  projectPathParent.appendChild(projectPathInput);

  const projectPathButton = document.createElement('button');
  projectPathButton.setAttribute('id', 'browse');
  const projectPathButtonText = document.createTextNode('Browse');
  projectPathButton.appendChild(projectPathButtonText);
  projectPathParent.appendChild(projectPathButton);

  const projectPathWarningElement = document.createElement('p');
  projectPathWarningElement.setAttribute('class', 'warning');
  pathParent.appendChild(projectPathWarningElement);

  projectPathButton.addEventListener('click', async () => {
    const inputPath = await dialog.showOpenDialog({
      properties: ['openDirectory']
    });

    const args = {
      godotHubPath,
      inputPath,
      projectPathWarningElement,
      projectPathInput,
      projectGodotVersionInput
    };

    validateImportProject(args);
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
  importProjectBody.appendChild(buttons);

  const cancelButton = document.createElement('button');
  const cancelButtonText = document.createTextNode('Cancel');
  cancelButton.setAttribute('class', 'cancel');
  cancelButton.appendChild(cancelButtonText);
  buttons.appendChild(cancelButton);

  // cancel button
  cancelButton.addEventListener('click', () => {
    body.removeChild(importProjectParentElement);
  });

  // import project button
  const importProjectbuttonElement = document.createElement('button');
  const importProjectbuttonText = document.createTextNode('Import project');
  importProjectbuttonElement.setAttribute('class', 'import');
  importProjectbuttonElement.appendChild(importProjectbuttonText);
  buttons.appendChild(importProjectbuttonElement);

  importProjectbuttonElement.addEventListener('click', () => {
    if (projectPathInput.value.length === 0) {
      if (projectPathWarningElement.textContent !== 'no project selected') {
        projectPathWarningElement.textContent = 'no project selected';
      }
    }
  });
});
