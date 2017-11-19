require('dotenv').config();
const express = require('express');
const db = require('../database/index.js');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist/compiled'));

const PORT = process.env.PORT || 8080;

app.post('/template-schedule', function (req, res) {
  let mondayDate = req.body.mondayDate;
  
  //store the template

  res.send(`week starting ${mondayDate} template is stored`);
});

app.listen(PORT, console.log(`now listening on port ${PORT}`));

module.exports = app;