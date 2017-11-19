const Sequelize = require('sequelize');
const Promise = require('bluebird');


const sequelize = new Sequelize(process.env.DB_NAME || 'shiftly', process.env.DB_USER || 'calebchoi', process.env.DB_PASS || null, { host: process.env.DB_HOST || 'localhost', dialect: 'postgres' });

// underscored = (snake_case foreign keys)
const User = sequelize.define('user', {
	name: { type: Sequelize.STRING, unique: true },
	role: Sequelize.STRING,
	password: Sequelize.STRING,
}, {underscored: true, timestamps: false});

const Schedule = sequelize.define('schedule', {
	monday_dates: { type: Sequelize.DATE, unique: true },
}, {underscored: true, timestamps: false});

const Employee_Availability = sequelize.define('employee_availability', {
	is_available: Sequelize.BOOLEAN,
}, {underscored: true, timestamps: false});

const Actual_Schedule = sequelize.define('actual_schedule', {
}, {underscored: true, timestamps: false});

const Needed_Employee = sequelize.define('needed_employee', {
	employees_needed: Sequelize.INTEGER,
}, {underscored: true, timestamps: false});

const Day_Part = sequelize.define('day_part', {
	name: { type: Sequelize.STRING, unique: true }
}, {underscored: true, timestamps: false});


// One-to-Many Relationships
User.hasMany(Actual_Schedule, { as: 'actual_schedule'});
User.hasMany(Employee_Availability, { as: 'employee_availability' });

Schedule.hasMany(Actual_Schedule, { as: 'actual_schedule'});
Schedule.hasMany(Needed_Employee, { as: 'needed_employee' });

Day_Part.hasMany(Employee_Availability, { as: 'employee_availability' });
Day_Part.hasMany(Actual_Schedule, { as: 'actual_schedule' });
Day_Part.hasMany(Needed_Employee, { as: 'needed_employee' });

// drops all table, just put it in so that it doesn't give an error for creating the same table everytime during dev
User.sync()
	.then(() => {
		return Schedule.sync();	
	})
	.then(() => {
		return Day_Part.sync();
	})
	.then(() => {
		return Employee_Availability.sync();
	})
	.then(() => {
		return Actual_Schedule.sync();
	})
	.then(() => {
		return Needed_Employee.sync();
	});

let findAllEmployeeAvailability = () => {
	let availability = [];
	return Day_Part.findAll({ attributes: ['id'] })
		.then((day_parts) => {
			return Promise.each(day_parts, (day_part) => {
				return Employee_Availability.findAll({ where: { day_part_id: day_part.dataValues.id, is_available: true }})
					.then((avail) => {
						availability.push(avail);
					});
			});
		})
		.then(() => {
			return availabilityParser(availability);
		});
};

const availabilityParser = (availability) => {
	let availObj = {};
	availability.forEach(availPerDayPart => {
		availPerDayPart.forEach(availByEmp => {
			if (!availObj[availByEmp.dataValues.day_part_id]) {
				availObj[availByEmp.dataValues.day_part_id] = [availByEmp.dataValues.user_id];
			} else {
				availObj[availByEmp.dataValues.day_part_id].push(availByEmp.dataValues.user_id);
			}
		});
	});
	return availObj;
}

const templateParser = (weekStart) => {
	let tempObj = {};
	return Schedule.find({ where: {monday_dates: weekStart} })
		.then((schedule) => {
			return Needed_Employee.findAll({ where: {schedule_id: schedule.dataValues.id, }});
		})
		.then((template) => {
			template.forEach(dayPart => {
				tempObj[dayPart.dataValues.day_part_id] = dayPart.dataValues.employees_needed;
			});
			return tempObj;
		});
}

module.exports = {
  User: User,
  Schedule: Schedule,
  Employee_Availability: Employee_Availability,
  Actual_Schedule: Actual_Schedule,
  Needed_Employee: Needed_Employee,
  Day_Part: Day_Part,
};