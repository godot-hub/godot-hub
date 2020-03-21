const dialog = require('electron').remote.dialog;
const path = require('path');
const importGodotHub = require('../../helpers/GodotHub/importGodotHub');

// import godot hub directory
const importElement = document.querySelector('#import');

importElement.addEventListener('click', async () => {
  const inputPath = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  const godotHubPath = inputPath.filePaths[0];
  const godotHubFolderName = path.parse(inputPath.filePaths[0]).name;

  // import godot hub directory if its a valid directory name
  if (godotHubFolderName === 'Godot-Hub') {
    console.log(godotHubFolderName);
    importGodotHub(godotHubPath);
  }
});
