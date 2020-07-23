const fs = require('fs');
const { renameSync } = require('graceful-fs');
const path = require('path');
const extract = require('extract-zip');
const getFileNameFromURL = require('../URL/getFileNameFromURL');
const changeFileExtension = require('../Change/changeFileExtension');

// install export templates if its not installed depending on its godot version
const installMonoExportTemplates = async (url, version, monoDir, godotHubPath, godotVersion) => {
  try {
    const dirPath = path.join(godotHubPath, 'Releases', version, 'Engine', monoDir, 'editor_data', 'templates', `${godotVersion}.stable.mono`);
    const monoExportTemplatesFileNameWithoutExtension = getFileNameFromURL(url).slice(0, -4);
    const monoExportTemplatesDirPath = path.join(godotHubPath, 'Releases', version, 'Engine', monoDir, 'editor_data', 'templates', monoExportTemplatesFileNameWithoutExtension);
    const monoExportTemplatesPath = path.join(godotHubPath, 'Releases', version, 'Engine', monoDir);
    const zippedExportTemplatesPath = path.join(godotHubPath, 'Releases', version, 'Engine', monoDir, `${monoExportTemplatesFileNameWithoutExtension}.zip`);
    const installPath = path.join(godotHubPath, 'Releases', version, 'Engine', monoDir, 'editor_data', 'templates');

    if (!fs.existsSync(dirPath) && !fs.existsSync(monoExportTemplatesDirPath)) {
      // change file extension
      changeFileExtension(path.join(monoExportTemplatesPath), monoExportTemplatesFileNameWithoutExtension, '.tpz', '.zip');

      // extract export templates
      await extract(zippedExportTemplatesPath, { dir: installPath });

      console.log('extracting');
      console.log(`${monoExportTemplatesFileNameWithoutExtension}.zip - Unzipped!`);

      // change directory name of installed export templates
      const currentPath = path.join(installPath, 'templates');
      const desiredPath = path.join(installPath, `${godotVersion}.stable.mono`);

      renameSync(currentPath, desiredPath);

      console.log(`${currentPath} changed to ${desiredPath}`);

      changeFileExtension(path.join(monoExportTemplatesPath), monoExportTemplatesFileNameWithoutExtension, '.zip', '.tpz');

      console.log('DONE extracting');
    } else {
      console.log('mono export templates is already installed');
    }
  } catch (err) {
    console.error(new Error(err));
  }
};

module.exports = installMonoExportTemplates;
