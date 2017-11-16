const Sequelize = require('sequelize');

//Setting up postgres
// 1. brew install postgres
// 2. run "psql postgres"
// checkout https://gist.github.com/apolloclark/ea5466d5929e63043dcf for commands
// I had to manually create a database on my local machine using terminal
// CREATE DATABASE <your database name> WITH OWNER <your owner name>
// default password is "null"
const sequelize = new Sequelize(/*database name*/, /*owner name*/, /*password*/, { host: 'localhost', dialect: 'postgres', });

// underscored = (snake_case foreign keys)
const User = sequelize.define('user', {
	name: Sequelize.STRING,
	role: Sequelize.STRING,
	password: Sequelize.STRING,
}, {underscored: true});

const Schedule = sequelize.define('schedule', {
	monday_dates: Sequelize.DATE,
}, {underscored: true});

const Employee_Availability = sequelize.define('employee_availability', {
	is_available: Sequelize.BOOLEAN,
}, {underscored: true});

const Actual_Schedule = sequelize.define('actual_schedule', {
	is_working: Sequelize.BOOLEAN,
}, {underscored: true});

const Needed_Employee = sequelize.define('needed_employee', {
	employees_needed: Sequelize.INTEGER,
}, {underscored: true});

const Day_Part = sequelize.define('day_part', {
	name: Sequelize.STRING,
}, {underscored: true});


// One-to-Many Relationships
User.hasMany(Actual_Schedule, { as: 'actual_schedule'});
User.hasMany(Employee_Availability, { as: 'employee_availability' });

Schedule.hasMany(Actual_Schedule, { as: 'actual_schedule'});
Schedule.hasMany(Needed_Employee, { as: 'needed_employee' });

Day_Part.hasMany(Employee_Availability, { as: 'employee_availability' });
Day_Part.hasMany(Actual_Schedule, { as: 'actual_schedule' });
Day_Part.hasMany(Needed_Employee, { as: 'needed_employee' });

module.exports = {
	User: User,
	Schedule: Schedule,
	Employee_Availability: Employee_Availability,
	Actual_Schedule: Actual_Schedule,
	Needed_Employee: Needed_Employee,
	Day_Part: Day_Part,
};