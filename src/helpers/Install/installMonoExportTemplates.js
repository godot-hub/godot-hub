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
const installMonoExportTemplates = (url, version, monoDir) => {
  initEditorDatadir(version, monoDir);
  initTemplatesDir(version, monoDir);

  const dirPath = path.join(process.cwd(), 'Godot-Hub', 'Releases', version, 'Engine', monoDir, 'editor_data', 'templates', `${version}.stable.mono`);
  const monoExportTemplatesFileNameWithoutExtension = getFileNameFromURL(url).slice(0, -4);
  const monoExportTemplatesDirPath = path.join(process.cwd(), 'Godot-Hub', 'Releases', version, 'Engine', monoDir, 'editor_data', 'templates', monoExportTemplatesFileNameWithoutExtension);
  const monoExportTemplatesPath = path.join(process.cwd(), 'Godot-Hub', 'Releases', version, 'Engine', monoDir);
  const zippedExportTemplatesPath = path.join(process.cwd(), 'Godot-Hub', 'Releases', version, 'Engine', monoDir, `${monoExportTemplatesFileNameWithoutExtension}.zip`);
  const installPath = path.join(process.cwd(), 'Godot-Hub', 'Releases', version, 'Engine', monoDir, 'editor_data', 'templates');

  if (!fs.existsSync(dirPath) && !fs.existsSync(monoExportTemplatesDirPath)) {
    // change file extension
    changeFileExtension(path.join(monoExportTemplatesPath), monoExportTemplatesFileNameWithoutExtension, '.tpz', '.zip');

    // extract export templates
    extract(zippedExportTemplatesPath, { dir: installPath }, (err) => {
      console.log('extracting');

      if (err) {
        console.error(new Error(err));
      }

      console.log(`${monoExportTemplatesFileNameWithoutExtension}.zip - Unzipped!`);

      // change directory name of installed export templates
      const currentPath = path.join(installPath, 'templates');
      const desiredPath = path.join(installPath, `${version}.stable.mono`);

      rename(currentPath, desiredPath, (err) => {
        if (err) {
          console.error(new Error(err));
        }

        console.log(`${currentPath} changed to ${desiredPath}`);
      });

      changeFileExtension(path.join(monoExportTemplatesPath), monoExportTemplatesFileNameWithoutExtension, '.zip', '.tpz');

      console.log('DONE extracting');
    });
  } else {
    console.log('mono export templates is already installed');
  }
};

module.exports = installMonoExportTemplates;
