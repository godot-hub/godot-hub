const fs = require('fs');
const path = require('path');
const process = require('process');

// create godot hub directory if it doesn't exist
const initGodotHubDir = () => {
  const dirPath = path.join(process.cwd(), 'Godot Hub');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

module.exports = initGodotHubDir;
