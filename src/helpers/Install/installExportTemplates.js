const fs = require('fs');
const path = require('path');
const process = require('process');
const extract = require('extract-zip');
const initScFile = require('../Init/initScFile');
const initEditorDatadir = require('../Init/initEditorDataDir');
const initTemplatesDir = require('../Init/initTemplatesDir');
const getFileNameFromURL = require('../URL/getFileNameFromURL');
const changeFileExtension = require('../Change/changeFileExtension');

// install export templates if its not installed depending on its godot version
const installExportTemplates = (url, version) => {
  initScFile(version);
  initEditorDatadir(version);
  initTemplatesDir(version);

  const dirPath = path.join(process.cwd(), 'Godot Hub', version, 'Engine', 'editor_data', 'templates', `${version}.stable`);
  const exportTemplatesFileNameWithoutExtension = getFileNameFromURL(url).slice(0, -4);
  const exportTemplatesDirPath = path.join(process.cwd(), 'Godot Hub', version, 'Engine', 'editor_data', 'templates', exportTemplatesFileNameWithoutExtension);
  const exportTemplatesPath = path.join(process.cwd(), 'Godot Hub', version, 'Engine');
  const zippedExportTemplatesPath = path.join(process.cwd(), 'Godot Hub', version, 'Engine', `${exportTemplatesFileNameWithoutExtension}.zip`);
  const installPath = path.join(process.cwd(), 'Godot Hub', version, 'Engine', 'editor_data', 'templates');

  if (!fs.existsSync(dirPath) && !fs.existsSync(exportTemplatesDirPath)) {
    // change file extension
    changeFileExtension(path.join(exportTemplatesPath), exportTemplatesFileNameWithoutExtension, '.tpz', '.zip');

    // extract export templates
    extract(zippedExportTemplatesPath, { dir: installPath }, (err) => {
      if (err) {
        console.error(new Error(err));
      }

      console.log(`${exportTemplatesFileNameWithoutExtension}.zip - Unzipped!`);

      // change directory name of installed export templates
      const currentPath = path.join(installPath, 'templates');
      const desiredPath = path.join(installPath, `${version}.stable`);

      fs.rename(currentPath, desiredPath, (err) => {
        if (err) {
          console.error(new Error(err));
        }

        console.log(`${currentPath} changed to ${desiredPath}`);
      });

      changeFileExtension(path.join(exportTemplatesPath), exportTemplatesFileNameWithoutExtension, '.zip', '.tpz');
    });
  }
};

module.exports = installExportTemplates;
