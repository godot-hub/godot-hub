const path = require('path');
const fs = require('fs');
const getReleaseName = require('../Releases/getReleaseName');

// get current installed export templates of installed godot releases
const getInstalledReleaseExportTemplates = (godotHubPath, installedReleases) => {
  return installedReleases.filter(version => {
    if (version.includes('mono')) {
      const godotVersion = version.slice(0, version.indexOf('-'));
      const monoDir = getReleaseName(godotVersion, 'mono', true).dirName;
      const monoExportTemplatesDir = getReleaseName(godotVersion, 'mono export templates', true).dirName;

      if (monoDir && monoExportTemplatesDir) {
        const monoExportTemplatesPath = path.join(godotHubPath, 'Releases', version, 'Engine', monoDir, 'editor_data', 'templates', monoExportTemplatesDir);

        // check if installed mono export templates directory exists
        if (fs.existsSync(monoExportTemplatesPath)) {
          const monoExportTemplatesNotEmpty = fs.readdirSync(monoExportTemplatesPath).length > 0;

          if (monoExportTemplatesNotEmpty) {
            return version;
          }
        }
      }
    } else {
      const exportTemplatesDir = getReleaseName(version, 'export templates').dirName;

      if (exportTemplatesDir) {
        const exportTemplatesPath = path.join(godotHubPath, 'Releases', version, 'Engine', 'editor_data', 'templates', exportTemplatesDir);

        // check if installed export templates directory exists
        if (fs.existsSync(exportTemplatesPath)) {
          const exportTemplatesNotEmpty = fs.readdirSync(exportTemplatesPath).length > 0;

          if (exportTemplatesNotEmpty) {
            return version;
          }
        }
      }
    }
  });
};

module.exports = getInstalledReleaseExportTemplates;
