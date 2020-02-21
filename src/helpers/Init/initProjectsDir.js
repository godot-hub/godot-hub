const fs = require('fs');

// create a projects directory for a specific release version if it doesn't exist
const initProjectsDir = (version) => {
  if (!fs.existsSync(`Godot Hub/${version}/Projects`)) {
    fs.mkdirSync(`Godot Hub/${version}/Projects`);
  }
};

module.exports = initProjectsDir;
