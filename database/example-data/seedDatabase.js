const Promise = require('bluebird');
const db = require('../../database');
const dummyData = require('./dummyData');
const { generateSchedule } = require('../../helpers/algo.js');

// Saves the week start date and the corresponding schedule id

const saveSchedule = (weekStart) => {
  return db.Schedule.create({ monday_dates: weekStart.monday_dates });
};

// Saves one business
const saveBusiness = (business) => {
  return db.Business.create({ name: business.name });
}

// Saves one user
const saveUser = (user) => {
  return db.User.create({ name: user.name, role: user.role, password: user.password, business_id: user.business_id });
};

// Saves the schedule template
const saveScheduleTemplate = (temp) => {
  return Promise.each(temp, (day) => {
    return db.Schedule.find({ where: { monday_dates: day.monday_date } })
      .then((result) => {
        // sets schedule_id to Schedule.id associated with the monday_date
        const schedule_id = result.id;
        return db.Day_Part.find({ where: { name: day.day_part } })
          .then((result) => {
            // sets day_part_id to Day_Part.id associated with the shift
            const day_part_id = result.id;
            return db.Business.find({ where: { id: day.business_id } })
              .then((result) => {
                const business_id = result.id;
                return db.Needed_Employee.create({ 
                  employees_needed: day.employees_needed,
                  schedule_id: schedule_id,
                  day_part_id: day_part_id,
                  business_id: business_id,
                });
              });
          });
      });
  });
};

// Saves availability for one employee
const saveEmployeeAvailability = (avail) => {
  return Promise.each(avail, (employeeAvail) => {
    return db.User.find({ where: { name: employeeAvail.name } })
      .then((result) => {
        let user_id = result.id;
        return db.Day_Part.find({ where: { name: employeeAvail.day_part } })
          .then((result) => {
            let day_part_id = result.id;
            return db.Employee_Availability.create({
              is_available: employeeAvail.is_available,
              user_id: user_id,
              day_part_id: day_part_id
            });
          });
      });
  });
};

const saveShiftTradeRequests = (request) => {
  return db.User.find({where: { name: request.user }})
    .then((response) => {
      const user_id = response.id;
      return db.Shift_Trade_Request.create({
        user_id,
        actual_schedule_id: request.scheduleId,
      });
    });
};

// initializes the database with dummy data
// ERROR IN TRYING TO GET THIS TO POPULATE WITH DUMMY DATA!
const initialize = () => {
  return saveSchedule(dummyData.weekStart1)
    .then(() => {
      return saveSchedule(dummyData.weekStart2);
    })
    .then(() => {
      return Promise.each(dummyData.business, (business) => {
        saveBusiness(business);
      });
    })
    .then(() => {
      return Promise.each(dummyData.users, (user) => {
        saveUser(user);
      });
    })
    .then(() => {
      return saveScheduleTemplate(dummyData.temp1);
    })
    .then(() => {
      return saveScheduleTemplate(dummyData.temp2);
    })
    .then(() => {
      return Promise.each(dummyData.avails, (avail) => {
        return saveEmployeeAvailability(avail);
      });
    })
    .then(() => {
      return generateSchedule('2017-12-04');
    })
    .then(() => {
      return generateSchedule('2017-12-11');
    })
    .then(() => {
      return Promise.each(dummyData.shift_trade_requests, (request) => {
        return saveShiftTradeRequests(request);
      });
    })
    .then(() => {
      db.sequelize.close();
    });
};

initialize();
