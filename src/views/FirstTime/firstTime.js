const { ipcRenderer } = require('electron');
const dialog = require('electron').remote.dialog;
const path = require('path');
const importGodotHub = require('../../helpers/GodotHub/importGodotHub');
const createGodotHub = require('../../helpers/GodotHub/createGodotHub');

// import godot hub directory
const importElement = document.querySelector('#import');

importElement.addEventListener('click', async () => {
  const inputPath = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  if (inputPath.filePaths[0]) {
    const godotHubPath = inputPath.filePaths[0];
    const godotHubFolderName = path.parse(inputPath.filePaths[0]).name;

    console.log(godotHubPath);

    // import godot hub directory if its a valid directory name
    if (godotHubFolderName === 'Godot-Hub') {
      console.log(godotHubFolderName);
      importGodotHub(godotHubPath);
    }
  }
});

// create godot hub directory
const createElement = document.querySelector('#create');

createElement.addEventListener('click', async () => {
  const inputPath = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  if (inputPath.filePaths[0]) {
    const godotHubPath = inputPath.filePaths[0];

    console.log(godotHubPath);

    createGodotHub(godotHubPath);
  }
});

// handle confirm close godot hub
const confirmCloseGodotHub = require('../../helpers/GodotHub/confirmCloseGodotHub');

ipcRenderer.on('should-quit', () => {
  confirmCloseGodotHub();
});
