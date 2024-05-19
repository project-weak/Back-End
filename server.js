'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const axios = require('axios');
// const jsonFileHome = require('home');
const fs = require('fs');
const path = require('path');


const port = process.env.Key_Port || 3000;
let db_URL = process.env.URL_DB;

let pg = require('pg')
const client = new pg.Client(db_URL);

app.use(cors());
app.use(express.json());
app.get('/', handleHome);
// app.get('/favorite', handleFavorite);


//functions
function handleHome(req, res) {
  const filePath = path.join(__dirname, 'home.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).json({ error: 'Failed to read data' });
    }
    res.json(JSON.parse(data));
  });
};



// Register the error handlers
app.use(handleServerError);
app.use(handlePageNotFoundError);

// Server error handler
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

client.connect().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
