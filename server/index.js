require('dotenv').config();
const express = require('express');
const db = require('../database/index.js');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist/compiled'));

app.get('/users', utils.getAllUsers, (req, res) => {
  res.write(JSON.stringify(req.users));
  res.end();
})

app.get('/employee_availabilities', utils.getAllEmployeeAvailabilities, (req, res) => {
  res.write(JSON.stringify(req.employeeAvailabilities));
  res.end();
})

app.get('/day_parts', utils.getAllDayParts, (req, res) => {
  res.write(JSON.stringify(req.dayParts));
  res.end();
})

app.post('/employee_availability', /*, utils.updateEmployeeAvailability,*/ (req, res) => {
  res.write(JSON.stringify([
    { user_id: 1 , day_part_id: 1, is_available: true },
    { user_id: 1 , day_part_id: 2, is_available: true },
    { user_id: 1 , day_part_id: 3, is_available: true },
    { user_id: 1 , day_part_id: 4, is_available: true },
    { user_id: 1 , day_part_id: 5, is_available: true },
    { user_id: 1 , day_part_id: 6, is_available: true },
    { user_id: 1 , day_part_id: 7, is_available: true },
    { user_id: 1 , day_part_id: 8, is_available: true },
    { user_id: 1 , day_part_id: 9, is_available: true },
    { user_id: 1 , day_part_id: 10, is_available: true },
    { user_id: 1 , day_part_id: 11, is_available: true },
    { user_id: 1 , day_part_id: 12, is_available: true },
    { user_id: 1 , day_part_id: 13, is_available: true },
    { user_id: 1 , day_part_id: 14, is_available: true },
  ]));
  res.end();
});

const PORT = process.env.PORT || 8080;

app.post('/template-schedule', function (req, res) {
  let mondayDate = req.body.mondayDate;
  
  //store the template

  res.send('template is stored');
});

app.listen(PORT, console.log(`now listening on port ${PORT}`));

module.exports = app;