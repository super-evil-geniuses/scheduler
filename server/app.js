const express = require('express');
const utils = require('../helpers/index.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { generateSchedule } = require('../helpers/algo.js');
const updateSchedules = require('../helpers/updateSchedules.js');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(utils.checkSession);

app.use(express.static(`${__dirname}/../client/dist/compiled`));

/**
|--------------------------------------------------
| NEW ROUTES
|--------------------------------------------------
*/

app.post('/savePreferences', updateSchedules, (req, res) => {
  // update db table scheduleActual
  res.json(req.schedules);
});

/**
|--------------------------------------------------
| END OF NEW ROUTES
|--------------------------------------------------
*/

app.get('/users', utils.getAllUsers, (req, res) => {
  res.json(req.users);
});

app.get(express.static(`${__dirname}/../client/dist/compiled/favicon.ico`));

app.get('/employee_availabilities', utils.getAllEmployeeAvailabilities, (req, res) => {
  res.json(req.employeeAvailabilities);
});

app.get('/day_parts', utils.getAllDayParts, (req, res) => {
  res.json(req.dayParts);
});

app.get('/needed_employees', utils.getAllNeededEmployees, (req, res) => {
  res.json(req.neededEmployees);
});

app.get('/schedule_dates', utils.getAllScheduleDates, (req, res) => {
  res.json(req.scheduleDates);
});

app.patch('/employee_availability', utils.updateEmployeeAvailability, (req, res) => {
  res.json(req.empoloyeeAvailabilities);
});

app.post('/add_employee', utils.findOrCreateBusiness, utils.addUser, utils.getAllDayParts, utils.addEmployeeAvailability, utils.getAllEmployeeAvailabilities, (req, res) => {
  res.json({ 
    user: req.user,
    employeeAvailabilities: req.employeeAvailabilities,
  });
});

app.patch('/needed_employees', utils.updateNeededEmployees, (req, res) => {
  res.json(req.scheduleTemplate);
  res.end();
});

app.post('/needed_employees', utils.createScheduleDate, utils.createScheduleTemplate, (req, res) => {
  res.json(req.scheduleTemplate);
});

app.post('/generate_schedule', (req, res) => { 
  generateSchedule(new Date(req.body.mondayDate))
    .then((schedule) => {
      res.json(schedule);
    });
});

app.post('/login', utils.authenticate, (req, res) => {
  res.redirect('/welcome_back');
});

app.post('/signup', /* utils.createBusiness, */ utils.createUser, (req, res) => {
  res.redirect('/welcome_back');
});

app.post('/logout', utils.destroySession, (req, res) => {
  res.status(200).end();
});

app.patch('/trade_shift', 
  utils.acceptTrade,
  utils.getAllDayParts,
  utils.getAllUsers,
  utils.getAllActualSchedules,
  utils.getAllEmployeeAvailabilities,
  utils.getAllScheduleDates,
  utils.getAllOpenTrades,
  utils.sendEmployeeInfo, (req, res) => {
  res.status(200).end();
});

app.post('/trade_shift', 
  utils.saveTrade,
  utils.getAllDayParts,
  utils.getAllUsers,
  utils.getAllActualSchedules,
  utils.getAllEmployeeAvailabilities,
  utils.getAllScheduleDates,
  utils.getAllOpenTrades,
  utils.sendEmployeeInfo, (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

app.get('/welcome_back',
  utils.redirectIfLoggedIn,
  utils.getAllDayParts,
  utils.getAllUsers,
  utils.getAllActualSchedules,
  utils.getAllEmployeeAvailabilities,
  utils.getAllScheduleDates,
  utils.getAllOpenTrades,
  utils.sendEmployeeInfo,
  utils.getAllNeededEmployees,
  (req, res) => {
    let obj = {};
    obj.role = req.session.role;
    obj.dayParts = req.dayParts;
    obj.view = 'employeeEditor';
    obj.scheduleActual = req.actual_schedules;
    obj.users = req.users;
    obj.neededEmployees = req.neededEmployees;
    obj.employeeAvailabilities = req.employeeAvailabilities;
    obj.scheduleDates = req.scheduleDates;
    res.json(obj);
  },
);

module.exports = app;
