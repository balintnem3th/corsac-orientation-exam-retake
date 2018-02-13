'use strict';// eslint-disable-line

/* eslint linebreak-style: ['error', 'windows'] */

const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 8080;

app.use(express.json());

app.use(express.static('page'));

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'orientation_retake',
});


conn.connect((err) => {
  if (err) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

conn.query('SELECT * FROM users;', (err, rows) => {// eslint-disable-line
  console.log('Data received from Db:\n');
  console.log(rows);
});

app.get('/users', (req, res) => {
  const sql1 = 'SELECT * FROM users';
  conn.query(sql1, (err, row) => {
    if (err) {
      res.status(400);
      res.json({
        error: err,
      });
    }
    res.status(200);
    res.json({
      rows: row,
    });
  });
});

app.listen(PORT, () => {
  console.log('App listening on :', PORT);
});
