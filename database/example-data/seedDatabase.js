const Promise = require('bluebird');
const db = require('../../database');
const dummyData = require('./dummyData');

// Saves the week start date and the corresponding schedule id
console.log('DB.SCHEDULE: ', db.Schedule);
console.log('DB.BUSINESS: ', db.Business);

let saveSchedule = (weekStart) => {
  return db.Schedule.create({ monday_dates: weekStart.monday_dates });
};

// Saves one business
let saveBusiness = (business) => {
  return db.Business.create({ name: business.name });
}

// Saves one user
let saveUser = (user) => {
  return db.User.create({ name: user.name, role: user.role, password: user.password });
};

// Saves the schedule template
let saveScheduleTemplate = (temp) => {
  return Promise.each(temp, (day) => {
    return db.Schedule.find({ where: { monday_dates: day.monday_date } })
      .then((result) => {
        let schedule_id = result.id;
        return db.Day_Part.find({ where: { name: day.day_part } })
          .then((result) => {
            let day_part_id = result.id;
            return db.Needed_Employee.create({ 
              employees_needed: day.employees_needed,
              schedule_id: schedule_id,
              day_part_id: day_part_id
            });
          });
      });
  });
};

// Saves availability for one employee
let saveEmployeeAvailability = (avail) => {
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

// initializes the database with dummy data
// ERROR IN TRYING TO GET THIS TO POPULATE WITH DUMMY DATA!
let initialize = () => {
  console.log('WE IN HERE');
  return saveSchedule(dummyData.weekStart)
    .then(() => {
      return Promise.each(dummyData.business, (business) => {
        console.log('THIS IS BUSINESS: ', business);
        console.log('THIS IS DUMMY DATA: ', dummyData);
        saveBusiness(business);
      });
    })
    .then(() => {
      return Promise.each(dummyData.users, (user) => {
        console.log('THIS IS USER: ', user);
        saveUser(user);
      });
    })
    .then(() => {
      return saveScheduleTemplate(dummyData.temp1);
    })
    .then(() => {
      return Promise.each(dummyData.avails, (avail) => {
        return saveEmployeeAvailability(avail);
      });
    })
    .then(() => {
      db.sequelize.close();
    });
};

initialize();
