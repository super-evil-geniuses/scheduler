const db = require('../database/index.js');
const Promise = require('bluebird');

const updateSchedules = (req, res, next) => {
  // define schedules
  const schedules = req.body;
  // iterate over all shifts
  const promises = [];

  db.Actual_Schedule.destroy({
    where: {},
    truncate: true,
  });

  for (let i = 0; i < schedules.length; i += 1) {
    promises.push(db.Actual_Schedule.create({
      day_part_id: schedules[i].day_part_id,
      schedule_id: schedules[i].schedule_id,
      user_id: schedules[i].user_id,
    }));
  }

  Promise.all(promises)
    .then(() => db.Actual_Schedule.findAll())
    .then((newSchedules) => {
      req.schedules = newSchedules;
      next();
    });
};

module.exports = updateSchedules;

