// db.js
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, 'mydata.db');

const db = new sqlite3.Database(dbPath);


// Create the clients table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clients (
      id_clients INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      num_tel INTEGER NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Erreur création table clients:', err);
    } 
  });
});


module.exports = db;
