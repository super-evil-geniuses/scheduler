const Promise = require('bluebird');
const db = require('../../database');
const dummyData = require('./dummyData');

const keys = [
  'User',
  'Schedule',
  'Employee_Availability',
  'Needed_Employee',
];


Promise.each(keys, key => db[key].bulkCreate(dummyData[key]))
  .then(() => {
    db.sequelize.close();
  });
