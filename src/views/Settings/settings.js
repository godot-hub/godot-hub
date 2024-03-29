const { ipcRenderer } = require('electron');
const dialog = require('electron').remote.dialog;
const path = require('path');
const fs = require('fs');
const os = require('os');
const initGodotHubConfig = require('../../helpers/Init/initGodotHubConfig');
const back = document.querySelector('#back');
const confirmClearCache = require('./confirmClearCache');

// go back to main menu on click event
back.addEventListener('click', () => {
  ipcRenderer.send('navigate', { filePath: './src/views/Index/index.html' });
});

// godot hub path
const godotHubConfigPath = path.join(os.homedir(), '.godot-hub.json');
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
        const updatedGodotHubConfigPath = path.join(os.homedir(), '.godot-hub.json');
        const updatedGodotHubPath = JSON.parse(fs.readFileSync(updatedGodotHubConfigPath)).godotHubPath;
        // reflect changed path on UI
        godotHubPathElement.value = updatedGodotHubPath;
      }
    }
  }
});

// default godot version
const getInstalledReleases = require('../../helpers/Releases/getInstalledReleases');
const installedReleases = getInstalledReleases(godotHubPath);
const sortedInstalledReleases = installedReleases.sort((a, b) => {
  const aVersion = a.split('.');
  const bVersion = b.split('.');

  for (let i = 0; i < aVersion.length; i++) {
    if (parseInt(aVersion[i]) > parseInt(bVersion[i])) {
      return 1;
    } else if (parseInt(bVersion[i]) > parseInt(aVersion[i])) {
      return -1;
    }
  }
}).reverse();

const defaultGodotVersionInput = document.querySelector('#default-godot-version');
let optionsList = [
  'Last Installed Version',
  'Newest Godot Version',
  'Newest Mono Version',
  'Oldest Godot Version',
  'Oldest Mono Version',
  ...sortedInstalledReleases
];

// reorder options list based on default godot version if it exists
const getDefaultRelease = require('../../helpers/Releases/getDefaultRelease');
const defaultRelease = getDefaultRelease(godotHubPath);

// reorder options list
if (defaultRelease) {
  console.log(getDefaultRelease(godotHubConfigPath));
  const defaultReleaseIndex = optionsList.indexOf(defaultRelease);

  const sortedOptionList = [];

  optionsList.forEach(release => {
    if (release === optionsList[defaultReleaseIndex]) {
      sortedOptionList.unshift(release);
    } else {
      sortedOptionList.push(release);
    }
  });

  optionsList = sortedOptionList;
}

// render options
optionsList.forEach(option => {
  const optionElement = document.createElement('option');
  const optionElementText = document.createTextNode(option);
  optionElement.appendChild(optionElementText);
  defaultGodotVersionInput.appendChild(optionElement);
});

// change default godot version
const setDefaultRelease = require('../../helpers/Releases/setDefaultRelease');

const lastDefaultGodotVersion = defaultGodotVersionInput.value;

defaultGodotVersionInput.addEventListener('change', (e) => {
  console.log(lastDefaultGodotVersion);
  console.log(e.target.value);
  const defaultGodotVersion = e.target.value;
  const defaultReleaseChanged = setDefaultRelease(godotHubPath, defaultGodotVersion);

  // revert changes if file config file doesn't exist
  if (defaultReleaseChanged === false) {
    e.target.value = lastDefaultGodotVersion;
  }
});

// clear cache
const clearCacheButton = document.querySelector('#clear-cache');

clearCacheButton.addEventListener('click', async () => {
  confirmClearCache(godotHubPath);
});

// handle confirm close godot hub
const confirmCloseGodotHub = require('../../helpers/GodotHub/confirmCloseGodotHub');

ipcRenderer.on('should-quit', () => {
  confirmCloseGodotHub();
});
