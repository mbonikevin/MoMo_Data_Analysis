const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());

const dbPath = path.join(__dirname, 'transactions.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('failed to connect to the database: ', err);
  } else {
    console.log('connected to SQLite database');
  }
});

app.get('/transactions', (req, res) => {
  const sql = 'SELECT * FROM transactions';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching transactions:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
