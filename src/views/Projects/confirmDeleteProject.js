const deleteProject = require('../../helpers/Project/deleteProject');

// show a warning and get confirmation from user to delete targeted project
const confirmDeleteProject = (projectPath, godotHubPath, name) => {
  const body = document.querySelector('body');

  // confirm delete project parent eleement
  const confirmDeleteProjectElementParent = document.createElement('section');
  confirmDeleteProjectElementParent.setAttribute('id', 'confirm-delete-project-parent');
  body.prepend(confirmDeleteProjectElementParent);
  // confirm delete project element
  const confirmDeleteProjectElement = document.createElement('section');
  confirmDeleteProjectElement.setAttribute('id', 'confirm-delete-project-element');
  confirmDeleteProjectElementParent.appendChild(confirmDeleteProjectElement);
  // delete project header element
  const deleteProjectHeaderElement = document.createElement('h1');
  const deleteProjectHeaderElementText = document.createTextNode(`Delete ${name}`);
  deleteProjectHeaderElement.appendChild(deleteProjectHeaderElementText);
  confirmDeleteProjectElement.appendChild(deleteProjectHeaderElement);
  // delete project body element
  const deleteProjectBodyElement = document.createElement('div');
  deleteProjectBodyElement.setAttribute('id', 'delete-project-body');
  const deleteProjectBodyMessage = document.createElement('p');
  const deleteProjectBodyMessageText = document.createTextNode(`Are you sure you want to delete ${name}?`);
  deleteProjectBodyMessage.appendChild(deleteProjectBodyMessageText);
  deleteProjectBodyElement.appendChild(deleteProjectBodyMessage);
  confirmDeleteProjectElement.appendChild(deleteProjectBodyElement);
  // delete project name confirm bar
  const deleteProjectNameConfirmParent = document.createElement('div');
  deleteProjectNameConfirmParent.setAttribute('id', 'delete-project-name-confirm-parent');
  const deleteProjectNameConfirmLabel = document.createElement('label');
  deleteProjectNameConfirmLabel.setAttribute('id', 'delete-project-name-confirm-label');
  deleteProjectNameConfirmLabel.appendChild(document.createTextNode('type '));
  const deleteProjectNameConfirmLabelTextSpan = document.createElement('span');
  deleteProjectNameConfirmLabelTextSpan.setAttribute('class', 'warningText');
  const deleteProjectNameConfirmLabelTextProjectName = document.createTextNode(`${name}`);
  deleteProjectNameConfirmLabelTextSpan.appendChild(deleteProjectNameConfirmLabelTextProjectName);
  deleteProjectNameConfirmLabel.appendChild(deleteProjectNameConfirmLabelTextSpan);
  deleteProjectNameConfirmLabel.appendChild(document.createTextNode(' to delete'));
  const deleteProjectNameConfirmTextBar = document.createElement('input');
  deleteProjectNameConfirmTextBar.setAttribute('id', 'delete-project-name-confirm-text-bar');
  deleteProjectNameConfirmTextBar.setAttribute('type', 'text');
  deleteProjectNameConfirmParent.appendChild(deleteProjectNameConfirmLabel);
  deleteProjectNameConfirmParent.appendChild(deleteProjectNameConfirmTextBar);
  deleteProjectBodyElement.appendChild(deleteProjectNameConfirmParent);

  // delete project buttons section
  const confirmDeleteProjectButtonsSection = document.createElement('section');
  confirmDeleteProjectButtonsSection.setAttribute('id', 'confirm-delete-project-buttons');
  deleteProjectBodyElement.appendChild(confirmDeleteProjectButtonsSection);
  // confirm delete project button
  const confirmDeleteProjectButton = document.createElement('button');
  confirmDeleteProjectButton.setAttribute('id', 'confirm-delete-project-button');
  const confirmDeleteProjectButtonText = document.createTextNode('Yes');
  confirmDeleteProjectButton.appendChild(confirmDeleteProjectButtonText);
  confirmDeleteProjectButtonsSection.appendChild(confirmDeleteProjectButton);

  confirmDeleteProjectButton.disabled = true;

  confirmDeleteProjectButton.addEventListener('click', () => {
    // delete project if project name matches and button is not disabled
    if (String(deleteProjectNameConfirmTextBar.value) === String(name) && !confirmDeleteProjectButton.disabled) {
      deleteProject(projectPath, godotHubPath);
      body.removeChild(confirmDeleteProjectElementParent);
    }
  });

  // cancel delete project button
  const cancelDeleteProjectButton = document.createElement('button');
  cancelDeleteProjectButton.setAttribute('id', 'cancel-delete-project-button');
  const cancelDeleteProjectButtonText = document.createTextNode('Cancel');
  cancelDeleteProjectButton.appendChild(cancelDeleteProjectButtonText);
  confirmDeleteProjectButtonsSection.appendChild(cancelDeleteProjectButton);

  cancelDeleteProjectButton.addEventListener('click', () => {
    body.removeChild(confirmDeleteProjectElementParent);
  });

  // enable delete project button only if project name is correct
  deleteProjectNameConfirmTextBar.addEventListener('keyup', () => {
    if (String(deleteProjectNameConfirmTextBar.value) === String(name)) {
      confirmDeleteProjectButton.disabled = false;
    } else {
      if (!confirmDeleteProjectButton.disabled) {
        confirmDeleteProjectButton.disabled = true;
      }
    }
  });
};

module.exports = confirmDeleteProject;
