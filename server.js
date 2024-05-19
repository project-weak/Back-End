'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const pg = require('pg');

const port = process.env.Key_Port || 3002;
let db_URL = process.env.URL_DB;

const client = new pg.Client(db_URL);

app.use(cors());
app.use(express.json());

app.get('/', handleHome);
app.get('/favorite', handleFavorite);
app.post('/addMusic', handleMusic);
app.delete('/DELETE', handleDelete);
app.put('/UPDATE/:id', handleUpdate);

// Functions
function handleHome(req, res) {
  const dataFilePath = path.join(__dirname, 'src', 'data.json');
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).json({ error: 'Failed to read data' });
    }
    res.json(JSON.parse(data));
  });
}

function handleFavorite(req, res) {
  const sql = `
    SELECT 'liked' AS source_table, id, music_name, singer_name, url_image, audio, comment
    FROM liked
    UNION ALL
    SELECT 'playlist' AS source_table, id, music_name, singer_name, url_image, audio, comment
    FROM playlist;
  `;
  client.query(sql).then((result) => {
    const Liked = result.rows.filter(item =>{
      return item.source_table === 'liked'
    })
    const Playlist = result.rows.filter(item =>{
      return item.source_table === 'playlist'
    })
    return res.status(200).json({Liked, Playlist});
  }).catch((error) => {
    handleServerError(error, req, res);
  });
}

function handleMusic(req, res) {
  const { music_name, singer_name, url_image, audio, comment, table } = req.body;
  const sql = `INSERT INTO ${table} (music_name, singer_name, url_image, audio, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  client.query(sql, [music_name, singer_name, url_image, audio, comment])
    .then((result) => {
      res.status(201).json(result.rows[0]);
    }).catch((error) => {
      handleServerError(error, req, res);
    });
}

function handleUpdate(req, res) {
  let id = req.params.id;
  let { comment, table } = req.body;
  let sql = `UPDATE ${table} SET comment=$1 WHERE id=$2 RETURNING *;`;
  const params = [comment, id];
  client.query(sql, params).then((result) => {
    return res.json(result.rows[0]);
  }).catch((error) => {
    handleServerError(error, req, res);
  });
}

function handleDelete(req, res) {
  const { id, table } = req.body;
  const sql = `DELETE FROM ${table} WHERE id = $1`;
  client.query(sql, [id]).then((result) => {
    console.log('Delete operation successful:', result.rowCount, 'rows deleted.');
    return res.status(200).send('Record deleted successfully');
  }).catch((error) => {
    console.error('Error deleting record:', error);
    return res.status(500).send('Error deleting record');
  });
}

// Error Handlers
function handleServerError(err, req, res) {
  console.error(err);
  const errorResponse = {
    status: 500,
    responseText: err
  };
  res.status(500).json(errorResponse);
}

function handlePageNotFoundError(req, res) {
  const errorResponse = {
    status: 404,
    responseText: "Page not found"
  };
  res.status(404).json(errorResponse);
}

// Register Error Handlers after routes
app.use(handleServerError);
app.use(handlePageNotFoundError);

// Start the server
client.connect().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.error('Failed to connect to the database:', err);
});
