const { ipcRenderer } = require('electron');
const dialog = require('electron').remote.dialog;
const path = require('path');
const fs = require('fs');
const initGodotHubConfig = require('../../helpers/Init/initGodotHubConfig');
const back = document.querySelector('#back');

// go back to main menu on click event
back.addEventListener('click', () => {
  ipcRenderer.send('navigate', { filePath: './src/components/Index/index.html' });
});

// godot hub path
const godotHubConfigPath = path.join(process.cwd(), 'godot-hub.json');
const godotHubPath = JSON.parse(fs.readFileSync(godotHubConfigPath)).godotHubPath;

// show godot hub path
const godotHubPathElement = document.querySelector('#godot-hub-path');
godotHubPathElement.value = godotHubPath;

// change godot hub path
const changePathElement = document.querySelector('#change-path');

// open file dialog on click
changePathElement.addEventListener('click', async () => {
  const inputPath = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  // attempt to perform changing godot hub path when a directory is chosen
  if (inputPath.filePaths[0]) {
    const newGodotHubPath = inputPath.filePaths[0];
    const godotHubFolderName = path.parse(inputPath.filePaths[0]).name;

    console.log(newGodotHubPath);

    // change godot hub directory if its a valid directory name
    if (godotHubFolderName === 'Godot-Hub') {
      console.log(godotHubFolderName);

      const requiredPaths = [
        path.join(newGodotHubPath, 'Releases'),
        path.join(newGodotHubPath, '.cache'),
        path.join(newGodotHubPath, '.config')
      ];

      // check if chose directory is a valid godot hub directory
      const isValidGodotHubDir = requiredPaths.map(currentPath => {
        if (!fs.existsSync(currentPath)) {
          return false;
        } else {
          return true;
        }
      });

      // allow only valid godot hub Directories
      if (!isValidGodotHubDir.includes(false)) {
        // change godot hub path in config file
        initGodotHubConfig(newGodotHubPath);
        // updated godot hub path
        const updatedGodotHubConfigPath = path.join(process.cwd(), 'godot-hub.json');
        const updatedGodotHubPath = JSON.parse(fs.readFileSync(updatedGodotHubConfigPath)).godotHubPath;
        // reflect changed path on UI
        godotHubPathElement.value = updatedGodotHubPath;
      }
    }
  }
});
