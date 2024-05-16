'use strict'

let db_URL=process.env.URL_DB;
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
require('dotenv').config();
const port = process.env.Key_Port||3000;
const axios = require('axios');

let pg = require('pg')
const client = new pg.Client(db_URL);

app.use(cors());
app.use(express.json());
app.get('/', handlelisten)


//functions
function handlelisten(req,res)
 {
  res.send('Hello, World!');
};



// Register the error handlers
app.use(handleServerError);
app.use(handlePageNotFoundError);

// Server error handler
function handleServerError(err, req, res) {
  console.error(err); 

  const errorResponse = {
    status: 500,
    responseText: "Sorry, something went wrong"
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


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 