const fs = require('fs');
const { rename } = require('graceful-fs');
const path = require('path');
const AdmZip = require('adm-zip');
const getFileNameFromURL = require('../URL/getFileNameFromURL');
const changeFileExtension = require('../Change/changeFileExtension');
const renderVersions = require('../../views/Versions/renderVersions');

// install export templates if its not installed depending on its godot version
const installMonoExportTemplates = (url, version, monoDir, godotHubPath, godotVersion, godotHubConfigPath) => {
  try {
    const dirPath = path.join(godotHubPath, 'Releases', version, 'Engine', monoDir, 'editor_data', 'templates', `${godotVersion}.stable.mono`);
    const monoExportTemplatesFileNameWithoutExtension = getFileNameFromURL(url).slice(0, -4);
    const monoExportTemplatesDirPath = path.join(godotHubPath, 'Releases', version, 'Engine', monoDir, 'editor_data', 'templates', monoExportTemplatesFileNameWithoutExtension);
    const monoExportTemplatesPath = path.join(godotHubPath, 'Releases', version, 'Engine', monoDir);
    const zippedExportTemplatesPath = path.join(godotHubPath, 'Releases', version, 'Engine', monoDir, `${monoExportTemplatesFileNameWithoutExtension}.zip`);
    const installPath = path.join(godotHubPath, 'Releases', version, 'Engine', monoDir, 'editor_data', 'templates');

    if (!fs.existsSync(dirPath) && !fs.existsSync(monoExportTemplatesDirPath)) {
      // change file extension
      changeFileExtension(monoExportTemplatesPath, monoExportTemplatesFileNameWithoutExtension, '.tpz', '.zip');

      console.log('extracting');

      // extract mono export templates
      const zip = new AdmZip(zippedExportTemplatesPath);
      zip.extractAllToAsync(installPath, true, (err) => {
        if (err) {
          console.error(new Error(err));
        }

        console.log(`${monoExportTemplatesFileNameWithoutExtension}.zip - Unzipped!`);

        // change directory name of installed mono export templates
        const currentPath = path.join(installPath, 'templates');
        const desiredPath = path.join(installPath, `${godotVersion}.stable.mono`);

        rename(currentPath, desiredPath, (err) => {
          if (err) {
            console.error(new Error(err));
          }

          console.log(`${currentPath} changed to ${desiredPath}`);

          changeFileExtension(path.join(monoExportTemplatesPath), monoExportTemplatesFileNameWithoutExtension, '.zip', '.tpz');

          console.log('DONE extracting');

          sessionStorage.removeItem(`mono-export-templates-${version}`);
          renderVersions(godotHubPath, godotHubConfigPath);
        });
      });
    } else {
      console.log('mono export templates is already installed');
    }
  } catch (err) {
    console.error(new Error(err));
  }
};

module.exports = installMonoExportTemplates;
