const os = require('os');

// get OS name combined with its arch
const getOSinfo = () => {
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
      OS = `osx.${arch}`;
      break;
    case 'linux':
      OS = `x11.${arch}`;
      break;
    default:
      OS = null;
  }

  return OS;
};

module.exports = getOSinfo;
