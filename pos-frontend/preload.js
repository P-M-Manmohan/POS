const { contextBridge, ipcRenderer } = require('electron');

// Expose limited API to renderer through contextBridge for security
contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage: (message) => ipcRenderer.send('message', message),
    receiveMessage: (callback) => ipcRenderer.on('message', callback),
});

