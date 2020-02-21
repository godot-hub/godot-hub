const fs = require('fs');

// create godot hub directory if it doesn't exist
const initGodotHubDir = () => {
  if (!fs.existsSync('Godot Hub')) {
    fs.mkdirSync('Godot Hub');
  }
};

module.exports = initGodotHubDir;
