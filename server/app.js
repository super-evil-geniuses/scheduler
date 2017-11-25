const express = require('express');
const utils = require('../helpers/index.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const generateSchedule = require('../helpers/algo.js').generateSchedule;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(utils.checkSession);

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

app.get('/needed_employees', utils.getAllNeededEmployees, (req, res) => {
  res.write(JSON.stringify(req.neededEmployees));
  res.end();
});

app.get('/schedule_dates', utils.getAllScheduleDates, (req, res) => {
  res.write(JSON.stringify(req.scheduleDates));
  res.end();
});

app.patch('/employee_availability', utils.updateEmployeeAvailability, (req, res) => {
  res.write(JSON.stringify(req.empoloyeeAvailabilities));
  res.end();
});

app.post('/add_employee', utils.addUser, utils.getAllDayParts, utils.addEmployeeAvailability, utils.getAllEmployeeAvailabilities, (req, res) => {
  res.json({ 
    user: req.user,
    employeeAvailabilities: req.employeeAvailabilities, 
  });
});

app.patch('/needed_employees', utils.updateNeededEmployees, (req, res) => {
  res.write(JSON.stringify(req.scheduleTemplate));
  res.end();
});

app.post('/needed_employees', utils.createScheduleDate, utils.createScheduleTemplate, (req, res) => {
  res.write(JSON.stringify(req.scheduleTemplate));
  res.end();
});

app.post('/generate_schedule', (req, res) => {
  
  generateSchedule(new Date(req.body.mondayDate))
    .then((schedule) => {
      res.write(JSON.stringify(schedule));
      res.end();
    })
})


//should be a post
app.get('/generate-schedule', function(req, res) {
  generateSchedule(new Date('11/13/17'))
    .then((schedule) => {
      // store actual schedule
      res.send(schedule);
    })
})

app.get('/welcome_back',
  utils.redirectIfLoggedIn,
  utils.getAllDayParts, 
  utils.getAllUsers,
  utils.getAllActualSchedules,
  utils.getAllEmployeeAvailabilities,
  utils.getAllScheduleDates,
  utils.sendEmployeeInfo,
  utils.getAllNeededEmployees,
  (req, res) => {
  let obj = {};
  obj.dayParts = req.dayParts;
  obj.view = 'employeeEditor';
  obj.scheduleActual = req.actual_schedules;
  obj.users = req.users;
  obj.neededEmployees = req.neededEmployees;
  obj.employeeAvailabilities = req.employeeAvailabilities;
  obj.scheduleDates = req.scheduleDates;
  res.json(obj);
});

app.post('/login', 
  utils.authenticate, 
  utils.getAllDayParts, 
  utils.getAllUsers,
  utils.getAllActualSchedules,
  utils.getAllEmployeeAvailabilities,
  utils.getAllScheduleDates,
  utils.sendEmployeeInfo,
  utils.getAllNeededEmployees,
  (req, res) => {
  let obj = {};
  obj.dayParts = req.dayParts;
  obj.view = 'employeeEditor';
  obj.users = req.users;
  obj.scheduleActual = req.actual_schedules;
  obj.neededEmployees = req.neededEmployees;
  obj.employeeAvailabilities = req.employeeAvailabilities;
  obj.scheduleDates = req.scheduleDates;
  res.json(obj);
})
app.post('/signup', utils.createUser, utils.getAllDayParts, (req, res) => {
  let obj = {};
  obj.dayParts = req.dayParts;
  obj.view = 'employeeEditor';
  res.json(obj);
})

app.post('/logout', utils.destroySession, (req, res) => {
  console.log('LOGGING CURRENT USER OUT');
  let obj = {};
  obj.dayParts = null
  obj.view = 'login';
  obj.users = null;
  obj.scheduleActual = null;
  obj.neededEmployees = null;
  obj.employeeAvailabilities = null;
  obj.scheduleDates = null;
  res.json(obj);
})

module.exports = app;