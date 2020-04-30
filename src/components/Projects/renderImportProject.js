const dialog = require('electron').remote.dialog;
const path = require('path');
const renderProjects = require('./renderProjects');
const validateImportProject = require('./validateImportProject');
const importProject = require('../../helpers/Project/importProject');

// render import project dialog
const renderImportProject = (godotHubPath) => {
  const body = document.querySelector('body');
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
      } else {
        const src = projectPathInput.value;
        const projectName = path.parse(src).name;
        const version = projectGodotVersionInput.value;
        const target = path.join(godotHubPath, 'Releases', version, 'Projects', projectName);

        importProject(src, target);
        body.removeChild(importProjectParentElement);
        renderProjects(godotHubPath);
      }
    });
  });
};

module.exports = renderImportProject;
