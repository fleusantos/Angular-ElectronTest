const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;
let savedText = '';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('dist/angular-electron-ipc/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

ipcMain.on('save-text', (event, text) => {
  savedText = text;
  fs.writeFileSync(path.join(__dirname, 'data.txt'), text, 'utf-8');
  event.sender.send('text-saved', text);
});

ipcMain.on('request-initial-text', (event) => {
  try {
    const text = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf-8');
    event.sender.send('text-saved', text);
  } catch (error) {
    event.sender.send('text-saved', '');
  }
});
