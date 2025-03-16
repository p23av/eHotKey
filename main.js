const { app, BrowserWindow, ipcMain } = require('electron');
const ks = require('node-key-sender');

let win;

app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 400,
    height: 200,
    alwaysOnTop: true,
    focusable: false,
    frame: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.loadFile('index.html');

  ipcMain.on('toggle-window', () => {
    ks.sendCombination(['control', 'tab']);
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
      app.quit();
  }
});
