const Promise = require('bluebird');
const db = require('../../database');
const dummyData = require('./dummyData');

const keys = [
  'User',
  'Day_Part',
  'Schedule',
  'Employee_Availability',
  'Needed_Employee',
];

Promise.all([
  db.User.sync(),
  db.Day_Part.sync(),
  db.Schedule.sync(),
])
  .then(() => Promise.all([
    db.Session.sync(),
    db.Employee_Availability.sync(),
    db.Actual_Schedule.sync(),
    db.Needed_Employee.sync(),
  ]))
  .then(() => {
    Promise.each(keys, key => db[key].bulkCreate(dummyData[key]));
  });
