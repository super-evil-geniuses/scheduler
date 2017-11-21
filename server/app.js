const express = require('express');
const utils = require('../helpers');
const bodyParser = require('body-parser');
const generateSchedule = require('../helpers/algo.js').generateSchedule;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist/compiled'));

app.get('/users', utils.getAllUsers, (req, res) => {
  res.write(JSON.stringify(req.users));
  res.end();
});

app.get('/employee_availabilities', utils.getAllEmployeeAvailabilities, (req, res) => {
  res.write(JSON.stringify(req.employeeAvailabilities));
  res.end();
});

app.get('/day_parts', utils.getAllDayParts, (req, res) => {
  res.write(JSON.stringify(req.dayParts));
  res.end();
});

app.patch('/employee_availability', utils.updateEmployeeAvailability, (req, res) => {
  res.write(JSON.stringify(req.empoloyeeAvailabilities));
  res.end();
});


app.post('/template-schedule', function (req, res) {
  let mondayDate = req.body.mondayDate;
  
  //store the template

  res.send('template is stored');
});

//should be a post
app.get('/generate-schedule', function(req, res) {
  generateSchedule(new Date('11/13/17'))
    .then((schedule) => {
      // store actual schedule
      res.send(schedule);
    })
})

module.exports = app;