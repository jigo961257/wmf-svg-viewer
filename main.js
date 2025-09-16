const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { execFile } = require('child_process');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  // For development with Vite
  win.loadURL('http://localhost:5173');
  // For production, use:
  // win.loadFile('dist/index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC: Open file dialog
ipcMain.handle('open-wmf', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [{ name: "WMF Images", extensions: ["wmf"] }],
    properties: ["openFile"]
  });
  if (canceled) return null;
  return filePaths[0];
});

// IPC: Convert WMF to SVG using ImageMagick
ipcMain.handle('convert-wmf-to-svg', async (event, inputPath) => {
  const outputPath = path.join(app.getPath('temp'), `converted_${Date.now()}.svg`);
  return new Promise((resolve) => {
    execFile('magick', [inputPath, outputPath], (error) => {
      if (error) {
        resolve({ error: error.message });
      } else {
        const data = fs.readFileSync(outputPath, 'utf8');
        fs.unlinkSync(outputPath);
        resolve({ svg: data });
      }
    });
  });
});