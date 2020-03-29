const os = require('os');

// get release name based on version, OS and arch
const getReleaseName = (version, type, mono = false) => {
  try {
    // get OS's arch
    let arch;

    switch (os.arch()) {
      case 'x64':
        arch = '64';
        break;
      case 'x32':
        arch = '32';
        break;
      default:
        break;
    }

    // get OS name combined with its arch
    let OS;

    switch (os.platform()) {
      case 'win32':
        if (mono) {
          OS = `win${arch}.exe`;
        } else {
          OS = `win${arch}`;
        }
        break;
      case 'darwin':
        if (mono) {
          OS = 'osx';
        } else {
          OS = `osx.${arch}`;
        }
        break;
      case 'linux':
        if (mono) {
          OS = `x11_${arch}`;
        } else {
          OS = `x11.${arch}`;
        }
        break;
      default:
        break;
    }

    // get release name based on version, OS and arch
    let releaseName;

    if (parseInt(version[0]) < 3) {
      switch (type) {
        case 'godot':
          releaseName = `Godot_v${version}_stable_${OS}.zip`;
          break;
        case 'export templates':
          releaseName = `Godot_v${version}_stable_export_templates.tpz`;
          break;
        default:
          break;
      }
    } else {
      if (mono) {
        switch (type) {
          case 'mono':
            releaseName = `Godot_v${version}-stable_mono_${OS}.zip`;
            break;
          case 'mono export templates':
            releaseName = `Godot_v${version}-stable_mono_export_templates.tpz`;
            break;
          default:
            break;
        }
      } else {
        switch (type) {
          case 'godot':
            releaseName = `Godot_v${version}-stable_${OS}.zip`;
            break;
          case 'export templates':
            releaseName = `Godot_v${version}-stable_export_templates.tpz`;
            break;
          default:
            break;
        }
      }
    }

    return releaseName;
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = getReleaseName;
