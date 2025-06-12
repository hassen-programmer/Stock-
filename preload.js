const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  addClient: (data) => ipcRenderer.invoke('add-client', data),
  fetchClients: () => ipcRenderer.invoke('fetch-clients'),
  searchClients: (keyword) => ipcRenderer.invoke('search-clients', keyword)
});
