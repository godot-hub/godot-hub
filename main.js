const { app, BrowserWindow, ipcMain, net, Menu } = require('electron');
const path = require('path');
const process = require('process');
const fs = require('fs');
const extract = require('extract-zip');

// handle error exceptions and rejections
process.on('unhandledRejection', (e) => console.error(new Error(e)));
process.on('uncaughtException', (e) => console.error(new Error(e)));

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, '/src/images/godot-hub-logo.png')
  });

  // show first time component if there is no defined path for godot hub
  const godotHubConfigPath = path.join(process.cwd(), 'godot-hub.json');

  if (!fs.existsSync(godotHubConfigPath)) {
    win.loadFile('./src/components/FirstTime/firstTime.html');
  } else {
    win.loadFile('./src/index.html');
  }

  // hide menubar
  Menu.setApplicationMenu(null);

  // Open the DevTools.
  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// scrapURL request
ipcMain.on('scrapURL-request', (event, arg) => {
  const { url, version } = arg;
  console.log(`args: ${JSON.stringify(arg, null, 2)}`);
  console.log(`url: ${url}`);
  console.log(`version: ${version}`);
  let data = '';
  const req = net.request(url);
  // return data on request response
  req.on('response', (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    console.log(`content-length:  ${res.headers['content-length']}`);
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      event.sender.send('scrapURL-response', { data, url, version });
    });
  });
  req.end();
});

// getMonoURL request
ipcMain.on('getMonoURL-request', (event, arg) => {
  const { OS, url } = arg;

  console.log(`ipcMain getMonoURL Request: ${OS}, ${url}`);

  let data = '';
  const req = net.request(url);
  // return data on request response
  req.on('response', (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    console.log(`content-length:  ${res.headers['content-length']}`);
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      event.sender.send('getMonoURL-response', { data, url: url });
    });
  });
  req.end();
});

// getGodotURL request
ipcMain.on('getGodotURL-request', (event, arg) => {
  const { OS, url } = arg;

  console.log(`ipcMain getGodotURL Request: ${OS}, ${url}`);

  let data = '';
  const req = net.request(url);
  // return data on request response
  req.on('response', (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    console.log(`content-length:  ${res.headers['content-length']}`);
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      event.sender.send('getGodotURL-response', { data, url: url });
    });
  });
  req.end();
});

// getExportTemplatesURL request
ipcMain.on('getExportTemplatesURL-request', (event, arg) => {
  const { url } = arg;

  console.log(`ipcMain getExportTemplatesURL Request: ${url}`);

  let data = '';
  const req = net.request(url);
  // return data on request response
  req.on('response', (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    console.log(`content-length:  ${res.headers['content-length']}`);
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      event.sender.send('getExportTemplatesURL-response', { data, url: url });
    });
  });
  req.end();
});

// getMonoExportTemplatesURL request
ipcMain.on('getMonoExportTemplatesURL-request', (event, arg) => {
  const { url } = arg;

  console.log(`ipcMain getMonoExportTemplatesURL Request: ${url}`);

  let data = '';
  const req = net.request(url);
  // return data on request response
  req.on('response', (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    console.log(`content-length:  ${res.headers['content-length']}`);
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      event.sender.send('getMonoExportTemplatesURL-response', { data, url: url });
    });
  });
  req.end();
});

// getGodot request
ipcMain.on('getGodot-request', (event, arg) => {
  const { url, path, extractTarget } = arg;

  if (fs.existsSync(path)) {
    console.log('getGodot exists');
    return;
  }

  console.log(`ipcMain getGodot request: ${url}`);

  const req = net.request(url);

  const data = [];
  let dataLength = 0;

  // return data on request response
  req.on('response', (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    console.log(`content-length:  ${res.headers['content-length']}`);

    res.on('data', (chunk) => {
      data.push(chunk);
      dataLength += chunk.length;
      console.log(`progress: ${dataLength} / ${res.headers['content-length']} ${Math.floor(parseInt(dataLength) / parseInt(res.headers['content-length']) * 100)}%`);
      event.sender.send('getGodot-progress', Math.floor(parseInt(dataLength) / parseInt(res.headers['content-length']) * 100));
    });

    res.on('end', () => {
      fs.writeFileSync(path, Buffer.concat(data));
      extract(path, { dir: extractTarget }, (err) => {
        if (err) {
          console.error(new Error(err));
        }

        console.log('getGodot - Unzipped!');

        event.sender.send('getGodot-Done');
      });
    });
  });

  req.end();
});

// getExportTemplates request
ipcMain.on('getExportTemplates-request', (event, arg) => {
  const { url, path } = arg;

  if (fs.existsSync(path)) {
    console.log('getExportTemplates exists');
    return;
  }

  console.log(`ipcMain getExportTemplates request: ${url}`);

  const req = net.request(url);

  const data = [];
  let dataLength = 0;

  // return data on request response
  req.on('response', (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    console.log(`content-length:  ${res.headers['content-length']}`);

    res.on('data', (chunk) => {
      data.push(chunk);
      dataLength += chunk.length;
      console.log(`progress: ${dataLength} / ${res.headers['content-length']} ${Math.floor(parseInt(dataLength) / parseInt(res.headers['content-length']) * 100)}%`);
      event.sender.send('getExportTemplates-progress', Math.floor(parseInt(dataLength) / parseInt(res.headers['content-length']) * 100));
    });

    res.on('end', () => {
      fs.writeFileSync(path, Buffer.concat(data));
      console.log('getExportTemplates - DONE');
    });
  });

  req.end();
});

// getMono request
ipcMain.on('getMono-request', (event, arg) => {
  const { url, path, extractTarget } = arg;

  if (fs.existsSync(path)) {
    console.log('getMono exists');
    return;
  }

  console.log(`ipcMain getMono request: ${url}`);

  const req = net.request(url);

  const data = [];
  let dataLength = 0;

  // return data on request response
  req.on('response', (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    console.log(`content-length:  ${res.headers['content-length']}`);

    res.on('data', (chunk) => {
      data.push(chunk);
      dataLength += chunk.length;
      console.log(`progress: ${dataLength} / ${res.headers['content-length']} ${Math.floor(parseInt(dataLength) / parseInt(res.headers['content-length']) * 100)}%`);
      event.sender.send('getMono-progress', Math.floor(parseInt(dataLength) / parseInt(res.headers['content-length']) * 100));
    });

    res.on('end', () => {
      fs.writeFileSync(path, Buffer.concat(data));
      extract(path, { dir: extractTarget }, (err) => {
        if (err) {
          console.error(new Error(err));
        }

        console.log('getMono - Unzipped!');

        event.sender.send('getMono-Done');
      });
      console.log('getMono - DONE');
    });
  });

  req.end();
});

// getMonoExportTemplates request
ipcMain.on('getMonoExportTemplates-request', (event, arg) => {
  const { url, path } = arg;

  if (fs.existsSync(path)) {
    console.log('getMonoExportTemplates exists');
    return;
  }

  console.log(`ipcMain getMonoExportTemplates request: ${url}`);

  const req = net.request(url);

  const data = [];
  let dataLength = 0;

  // return data on request response
  req.on('response', (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    console.log(`content-length:  ${res.headers['content-length']}`);

    res.on('data', (chunk) => {
      data.push(chunk);
      dataLength += chunk.length;
      console.log(`progress: ${dataLength} / ${res.headers['content-length']} ${Math.floor(parseInt(dataLength) / parseInt(res.headers['content-length']) * 100)}%`);
      event.sender.send('getMonoExportTemplates-progress', Math.floor(parseInt(dataLength) / parseInt(res.headers['content-length']) * 100));
    });

    res.on('end', () => {
      fs.writeFileSync(path, Buffer.concat(data));
      console.log('getMonoExportTemplates - DONE');
    });
  });

  req.end();
});

// pass release info to index.js
ipcMain.on('release-info-main', (event, arg) => {
  console.log(JSON.stringify(arg));
  event.sender.send('release-info-client', arg);
});
