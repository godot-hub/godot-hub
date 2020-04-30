const fs = require('fs');
const path = require('path');
const getCurrentProjects = require('../../helpers/Project/getCurrentProjects');

// allow only import project when it passes validation
const validateImportProject = (args) => {
  // destruct args
  const {
    godotHubPath,
    inputPath,
    projectPathWarningElement,
    projectPathInput,
    projectGodotVersionInput
  } = args;

  // validate project if a valid project path is selected
  if (inputPath.filePaths[0]) {
    // reset project path warning element
    if (projectPathWarningElement.textContent.length > 0) {
      projectPathWarningElement.textContent = '';
    }

    // reset path input value
    if (projectPathInput.value.length > 0) {
      projectPathInput.value = '';
    }

    const godotProjectPath = inputPath.filePaths[0];
    const godotProjectName = path.parse(inputPath.filePaths[0]).name;

    console.log(godotProjectPath);

    const godotProjectSubDirs = fs.readdirSync(godotProjectPath);

    console.log(godotProjectSubDirs);
    console.log(godotProjectName);

    const currentProjects = getCurrentProjects(godotHubPath).flat();
    const currentProjectsNames = currentProjects.map(project => project.name);

    console.log(currentProjects);
    console.log(currentProjectsNames);

    // check if the selected project doesn't exist
    if (currentProjectsNames.includes(godotProjectName)) {
      const currentProject = currentProjects.filter(project => {
        return project.name === godotProjectName;
      });

      const isNotValidProject = currentProject.map(project => {
        console.log(project.version);
        console.log(projectGodotVersionInput.value);
        if (parseInt(project.version) === parseInt(projectGodotVersionInput.value)) {
          return true;
        }
      });

      console.log(isNotValidProject);

      // import project if project name exists but versions don't match
      if (!isNotValidProject.includes(true)) {
        // make project path show if its valid
        console.log('allowed');
        // allow only valid godot projects with compatiable versions based on their config file

        // reject if the path chosen is not a valid godot project
        if (!godotProjectSubDirs.includes('project.godot') && !godotProjectSubDirs.includes('engine.cfg')) {
          if (projectPathWarningElement.textContent !== 'not a valid godot project') {
            projectPathWarningElement.textContent = 'not a valid godot project';
          }
        } else {
          if (godotProjectSubDirs.includes('project.godot') && parseInt(projectGodotVersionInput.value[0]) >= 3) {
            projectPathInput.value = godotProjectPath;
            console.log(projectGodotVersionInput.value);
          } else if (godotProjectSubDirs.includes('engine.cfg') && parseInt(projectGodotVersionInput.value[0]) < 3) {
            projectPathInput.value = godotProjectPath;
            console.log(projectGodotVersionInput.value);
          } else {
            projectPathWarningElement.textContent = 'project version doesn\'t match';
          }
        }
      } else {
        projectPathWarningElement.textContent = 'project already exists with the current version';
      }
    } else {
      // reject if the path chosen is not a valid godot project
      if (!godotProjectSubDirs.includes('project.godot') && !godotProjectSubDirs.includes('engine.cfg')) {
        if (projectPathWarningElement.textContent !== 'not a valid godot project') {
          projectPathWarningElement.textContent = 'not a valid godot project';
        }
      } else {
        if (godotProjectSubDirs.includes('project.godot') && parseInt(projectGodotVersionInput.value[0]) >= 3) {
          projectPathInput.value = godotProjectPath;
          console.log(projectGodotVersionInput.value);
        } else if (godotProjectSubDirs.includes('engine.cfg') && parseInt(projectGodotVersionInput.value[0]) < 3) {
          projectPathInput.value = godotProjectPath;
          console.log(projectGodotVersionInput.value);
        } else {
          projectPathWarningElement.textContent = 'project version doesn\'t match';
        }
      }
    }
  }
};

module.exports = validateImportProject;
