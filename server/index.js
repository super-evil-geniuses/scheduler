require('dotenv').config();
const express = require('express');
const db = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist/compiled'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`now listening on port ${PORT}`));