const { app, BrowserWindow, ipcMain } = require('electron');
const ks = require('node-key-sender');

let win;

app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 80,
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

  ipcMain.on('nextTab', () => {
    ks.sendCombination(['control', 'tab']);
  })

  ipcMain.on('prevTab', () => {
    ks.sendCombination(['control', 'shift', 'tab']);
  })

  ipcMain.on('refreshTab', () => {
    ks.sendCombination(['control', 'r']);
  })

  ipcMain.on('returnTab', () => {
    ks.sendCombination(['control', 'shift', 't']);
  })

  ipcMain.on('closeTab', () => {
    ks.sendCombination(['control', 'w']);
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
      app.quit();
  }
});
