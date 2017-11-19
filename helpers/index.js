const db = require('../database');

// Takes new employeeAvailabilities and updates them in the database
const updateEmployeeAvailability = (req, res, next) => {
  const employeeAvailabilities = req.body.employeeAvailabilities;
  return Promise.each(employeeAvailabilities, (employeeAvail) => {
    db.User.find({ where: {name: employeeAvail.name} }
    ).then((userRow) => {
      const user_id = userRow.id;
      db.Day_Part.find({ where: {name: employeeAvail.day_part} }
      ).then((dayRow) => {
        const day_part_id = dayRow.id;
        const updates = { is_available: employeeAvail.is_available }
        const conditions = {
          where: {
            user_id: user_id,
            day_part_id: day_part_id
          }
        }
        return db.Employee_Availability.update(updates, conditions);
      }).then((result) => {
        console.log('RES:', result);
      })
		});
	}).then((result) => {
    console.log('FIN:', result);
    next();
  })
}

module.exports = {
  updateEmployeeAvailability: updateEmployeeAvailability
};