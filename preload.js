const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  fetchClients: () => ipcRenderer.invoke('fetch-clients'),
  searchClients: (keyword) => ipcRenderer.invoke('search-clients', keyword)
});
