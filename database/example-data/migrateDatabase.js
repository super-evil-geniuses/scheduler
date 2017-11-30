const Promise = require('bluebird');
const db = require('../../database');
const dummyData = require('./dummyData');

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
  .then(() => db.Day_Part.bulkCreate(dummyData.Day_Part))
  .catch(() => {});
