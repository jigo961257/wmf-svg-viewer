const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openWMF: () => ipcRenderer.invoke('open-wmf'),
  convertWMFtoSVG: (inputPath) => ipcRenderer.invoke('convert-wmf-to-svg', inputPath)
});