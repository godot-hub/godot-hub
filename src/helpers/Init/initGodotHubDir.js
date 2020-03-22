const fs = require('fs');
const path = require('path');

// create godot hub directory if it doesn't exist
const initGodotHubDir = (godotHubPath) => {
  const dirPath = path.join(godotHubPath, 'Godot-Hub');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initGodotHubDir;
