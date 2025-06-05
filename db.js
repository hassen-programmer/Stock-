// db.js
const sqlite3 = require('sqlite3').verbose();

// Create or open the database
const db = new sqlite3.Database('mydata.db');

// Create the clients table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clients (
      id_clients INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL REQUIRED,
      num_tel INT(8) NOT NULL REQUIRED,
    )
  `);
});

module.exports = db;
