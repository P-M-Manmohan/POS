const { contextBridge, ipcRenderer } = require('electron');

// Expose limited API to renderer through contextBridge for security
contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage: (message) => ipcRenderer.send('message', message),
    receiveMessage: (callback) => ipcRenderer.on('message', callback),
    ipcRenderer: {
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
    removeListener: (channel, callback) => ipcRenderer.removeListener(channel, callback),
  },
});
