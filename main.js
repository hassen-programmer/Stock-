const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const db = require('./db');

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
  });

  win.loadFile('index.html'); // Your main/start page
  Menu.setApplicationMenu(null);
}

// IPC handler to fetch clients from DB
ipcMain.handle('fetch-clients', async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM clients', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
});
ipcMain.handle('search-clients', async (event, keyword) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM clients
      WHERE name LIKE ? OR num_tel LIKE ?
    `;
    const nameTerm = `%${keyword}%`;   // still allow any part of name
    const telTerm = `${keyword}%`;     // only match phone numbers that start with the keyword

    db.all(query, [nameTerm, telTerm], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
