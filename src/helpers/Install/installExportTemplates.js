const fs = require('fs');
const { renameSync } = require('graceful-fs');
const path = require('path');
const extract = require('extract-zip');
const getFileNameFromURL = require('../URL/getFileNameFromURL');
const changeFileExtension = require('../Change/changeFileExtension');
const renderVersions = require('../../components/Versions/renderVersions');

// install export templates if its not installed depending on its godot version
const installExportTemplates = async (url, version, godotHubPath, godotHubConfigPath) => {
  try {
    const dirPath = path.join(godotHubPath, 'Releases', version, 'Engine', 'editor_data', 'templates', `${version}.stable`);
    const exportTemplatesFileNameWithoutExtension = getFileNameFromURL(url).slice(0, -4);
    const exportTemplatesDirPath = path.join(godotHubPath, 'Releases', version, 'Engine', 'editor_data', 'templates', exportTemplatesFileNameWithoutExtension);
    const exportTemplatesPath = path.join(godotHubPath, 'Releases', version, 'Engine');
    const zippedExportTemplatesPath = path.join(godotHubPath, 'Releases', version, 'Engine', `${exportTemplatesFileNameWithoutExtension}.zip`);
    const installPath = path.join(godotHubPath, 'Releases', version, 'Engine', 'editor_data', 'templates');

    if (!fs.existsSync(dirPath) && !fs.existsSync(exportTemplatesDirPath)) {
      // change file extension
      changeFileExtension(exportTemplatesPath, exportTemplatesFileNameWithoutExtension, '.tpz', '.zip');

      console.log('extracting');

      // extract export templates
      await extract(zippedExportTemplatesPath, { dir: installPath });

      console.log(`${exportTemplatesFileNameWithoutExtension}.zip - Unzipped!`);

      // change directory name of installed export templates
      const currentPath = path.join(installPath, 'templates');

      renameSync(currentPath, dirPath);

      console.log(`${currentPath} changed to ${dirPath}`);

      changeFileExtension(exportTemplatesPath, exportTemplatesFileNameWithoutExtension, '.zip', '.tpz');

      console.log('DONE extracting');

      renderVersions(godotHubPath, godotHubConfigPath);
    } else {
      console.log('export templates is already installed');
    }
  } catch (err) {
    console.error(new Error(err));
  }
};

module.exports = installExportTemplates;
