const fs = require('fs');
const { rename } = require('graceful-fs');
const path = require('path');
const process = require('process');
const extract = require('extract-zip');
const initEditorDatadir = require('../Init/initEditorDataDir');
const initTemplatesDir = require('../Init/initTemplatesDir');
const getFileNameFromURL = require('../URL/getFileNameFromURL');
const changeFileExtension = require('../Change/changeFileExtension');

// install export templates if its not installed depending on its godot version
const installExportTemplates = (url, version) => {
  initEditorDatadir(version);
  initTemplatesDir(version);

  const dirPath = path.join(process.cwd(), 'Godot-Hub', version, 'Engine', 'editor_data', 'templates', `${version}.stable`);
  const exportTemplatesFileNameWithoutExtension = getFileNameFromURL(url).slice(0, -4);
  const exportTemplatesDirPath = path.join(process.cwd(), 'Godot-Hub', version, 'Engine', 'editor_data', 'templates', exportTemplatesFileNameWithoutExtension);
  const exportTemplatesPath = path.join(process.cwd(), 'Godot-Hub', version, 'Engine');
  const zippedExportTemplatesPath = path.join(process.cwd(), 'Godot-Hub', version, 'Engine', `${exportTemplatesFileNameWithoutExtension}.zip`);
  const installPath = path.join(process.cwd(), 'Godot-Hub', version, 'Engine', 'editor_data', 'templates');

  if (!fs.existsSync(dirPath) && !fs.existsSync(exportTemplatesDirPath)) {
    // change file extension
    changeFileExtension(path.join(exportTemplatesPath), exportTemplatesFileNameWithoutExtension, '.tpz', '.zip');

    // extract export templates
    extract(zippedExportTemplatesPath, { dir: installPath }, (err) => {
      console.log('extracting');

      if (err) {
        console.error(new Error(err));
      }

      console.log(`${exportTemplatesFileNameWithoutExtension}.zip - Unzipped!`);

      // change directory name of installed export templates
      const currentPath = path.join(installPath, 'templates');

      rename(currentPath, dirPath, (err) => {
        if (err) {
          console.error(new Error(err));
        }

        console.log(`${currentPath} changed to ${dirPath}`);
      });

      changeFileExtension(path.join(exportTemplatesPath), exportTemplatesFileNameWithoutExtension, '.zip', '.tpz');

      console.log('DONE extracting');
    });
  } else {
    console.log('export templates is already installed');
  }
};

module.exports = installExportTemplates;
