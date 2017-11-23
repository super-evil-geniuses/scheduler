const db = require('../database');
const Promise = require('bluebird');

const getAllUsers = (req, res, next) => {
  db.User.findAll({})
    .then((allUsers) => {
      req.users = allUsers;
      console.log('all users: ', allUsers)
      next();
    }).catch((err) => {
      res.end(500, 'Error getting users');
    });
};

const getAllScheduleDates = (req, res, next) => {
  db.Schedule.findAll({})
    .then((allScheduleDates) => {
      req.scheduleDates = allScheduleDates;
      next();
    }).catch((err) => {
      res.end(500, 'Error getting users');
    });
};

const getAllNeededEmployees = (req, res, next) => {
  db.Needed_Employee.findAll({})
    .then((allNeededEmployees) => {
      req.neededEmployees = allNeededEmployees;
      next();
    }).catch((err) => {
      res.end(500, 'Error getting neededEmployees');
    });
};

const getAllEmployeeAvailabilities = (req, res, next) => {
  db.Employee_Availability.findAll({})
    .then((allEmployeeAvailabilities) => {
      req.employeeAvailabilities = allEmployeeAvailabilities;
      next();
    }).catch((err) => {
      res.end(500, 'Error getting users');
    });
};

const getAllDayParts = (req, res, next) => {
  db.Day_Part.findAll({})
    .then((allDayParts) => {
      req.dayParts = allDayParts;
      next();
    }).catch((err) => {
      res.end(500, 'Error getting users');
    });
};

const addUser = (req, res, next) => {
  db.User.create({
    name: req.body.username,
    role: 'employee',
    password: null,
  })
    .then((user) => {
      req.user = user;
      next();
    }).catch((err) => {
      res.end(500, `Error adding new user: ${err}`);
    });
};

const addEmployeeAvailability = (req, res, next) => {
  const parsedUserId = JSON.parse(JSON.stringify(req.user)).id;
  const parsedDayPartsKeys = Object.keys(req.dayParts);

  Promise.each(parsedDayPartsKeys, (key) => {
    const id = JSON.parse(key) + 1;
    return db.Employee_Availability.create({
      is_available: false,
      user_id: parsedUserId,
      day_part_id: id,
    })
      .catch((err) => {
        res.status(500).send(`error adding availability for daypartid ${id}: ${err}`);
      });
  })
    .then(() => {
      next();
    }).catch((err) => {
      res.status(500).send(`error adding availability for user ${parsedUserId}: ${err}`);
    });
};

// Takes new employeeAvailabilities and updates them in the database
const updateEmployeeAvailability = (req, res, next) => {
  return Promise.each(req.body.employeeAvailabilities, (employeeAvail) => {
    const updates = { is_available: employeeAvail.is_available };
    const conditions = {
      where: {
        user_id: employeeAvail.user_id,
        day_part_id: employeeAvail.day_part_id,
      },
    };
    return db.Employee_Availability.update(updates, conditions);
  }).then((updatedAvailabilities) => {
    req.empoloyeeAvailabilities = updatedAvailabilities;
    next();
  });
};

module.exports = {
  getAllUsers: getAllUsers,
  updateEmployeeAvailability: updateEmployeeAvailability,
  getAllEmployeeAvailabilities: getAllEmployeeAvailabilities,
  getAllDayParts: getAllDayParts,
  getAllNeededEmployees: getAllNeededEmployees,
  getAllScheduleDates: getAllScheduleDates,
  addUser: addUser,
  addEmployeeAvailability: addEmployeeAvailability,
};
