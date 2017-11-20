const db = require('../database');

// Takes new employeeAvailabilities and updates them in the database
const updateEmployeeAvailability = (req, res, next) => {
  const employeeAvailabilities = req.body.employeeAvailabilities;
  return Promise.each(employeeAvailabilities, (employeeAvail) => {
    db.Day_Part.find({ where: {name: employeeAvail.day_part} }
    ).then((dayRow) => {
      const day_part_id = dayRow.id;
      const updates = { is_available: employeeAvail.is_available }
      const conditions = {
        where: {
          user_id: employeeAvail.user_id,
          day_part_id: day_part_id
        }
      }
      return db.Employee_Availability.update(updates, conditions);
    }).then((result) => {
      console.log('RES:', result);
    })
	}).then((result) => {
    console.log('FIN:', result);
    next();
  })
}

const getAllUsers = (req, res, next) => {
  db.User.findAll({})
    .then((allUsers) => {
      req.users = allUsers;
      next();
    }).catch((err) => {
      res.end(500, 'Error getting users');
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
  db.Employee_Availability.findAll({})
    .then((allEmployeeAvailabilities) => {
      req.employeeAvailabilities = allEmployeeAvailabilities;
      next();
    }).catch((err) => {
      res.end(500, 'Error getting users');
    });
};

module.exports = {
  getAllUsers: getAllUsers,
  updateEmployeeAvailability: updateEmployeeAvailability,
  getAllEmployeeAvailabilities: getAllEmployeeAvailabilities,
  getAllDayParts: getAllDayParts,
};
