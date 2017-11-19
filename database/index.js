const Sequelize = require('sequelize');
const Promise = require('bluebird');
const dummyData = require('./example-data/dummyData');

const sequelize = new Sequelize(process.env.DB_NAME || 'shiftly', process.env.DB_USER || 'postgres', process.env.DB_PASS || null, { host: process.env.DB_HOST || 'localhost', dialect: 'postgres' });

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
sequelize.drop()
	.then(() => {
		return User.sync();
	})
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
	})
	.then(() => {
		initialize();	// initializing database with dummy data, 
	});

// Save day_parts. Probably won't need it after initialization
let saveDayParts = (dayParts) => {
	return Promise.each(dayParts, (dayPart) => {
		Day_Part.create({ name: dayPart });
	});
};

// Saves the week start date and the corresponding schedule id
let saveSchedule = (weekStart) => {
	return Schedule.create({ monday_dates: weekStart.monday_dates });
};

// Saves one user
let saveUser = (user) => {
	return User.create({ name: user.name, role: user.role, password: user.password});
};

// Saves the schedule template
let saveScheduleTemplate = (temp) => {
	return Promise.each(temp, (day) => {
		Schedule.find({ where: { monday_dates: day.monday_date } })
			.then((result) => {
				let schedule_id = result.id;
				Day_Part.find({ where: { name: day.day_part } })
					.then((result) => {
						let day_part_id = result.id;
						Needed_Employee.create({ 
							employees_needed: day.employees_needed,
							schedule_id: schedule_id,
							day_part_id: day_part_id
						});
					})
			})
	});
}

// Saves availability for one employee
let saveEmployeeAvailability = (avail) => {
	return Promise.each(avail, (employeeAvail) => {
		User.find({ where: {name: employeeAvail.name} })
			.then((result) => {
				let user_id = result.id;
				Day_Part.find({ where: {name: employeeAvail.day_part} })
					.then((result) => {
						let day_part_id = result.id;
						Employee_Availability.create({
							is_available: employeeAvail.is_available,
							user_id: user_id,
							day_part_id: day_part_id
						});
					});
			});
	});
}

// initializes the database with dummy data
let initialize = () => {
	saveSchedule(dummyData.weekStart)
		.then(() => {
			return saveDayParts(dummyData.dayParts);
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
			return Promise.each(dummyData.avails, (avail) => {
				return saveEmployeeAvailability(avail);
			});
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