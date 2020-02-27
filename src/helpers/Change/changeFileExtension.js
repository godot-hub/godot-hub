const path = require('path');
const fs = require('fs');

// change file extension based on its path, filename and extension provided
const changeFileExtension = (filePath, filename, extension, desiredExtension) => {
  const currentPath = path.join(filePath, filename + extension);
  const desiredPath = path.join(filePath, filename + desiredExtension);

  console.log(currentPath);
  console.log(desiredPath);

  // check if file provided exists
  if (fs.existsSync(currentPath)) {
    // check if desired file exetnsion already exists
    if (!fs.existsSync(desiredPath)) {
      fs.rename(currentPath, desiredPath, (err) => {
        if (err) {
          console.error(new Error(err));
        }

        console.log(`${currentPath} changed to ${desiredPath}`);
      });
    } else {
      console.log('file extension already changed');
    }
  } else {
    console.log("file extension doesn't exist");
  }
};

module.exports = changeFileExtension;