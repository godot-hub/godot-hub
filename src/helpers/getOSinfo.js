const os = require('os');

// get OS name combined with its arch
const getOSinfo = (mono = false) => {
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
        arch = null;
    }

    // get OS name combined with its arch
    let OS;

    switch (os.platform()) {
      case 'win32':
        OS = `win${arch}`;
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
        OS = null;
    }

    return OS;
  } catch (e) {
    console.error(new Error(e));
  }
};

module.exports = getOSinfo;
