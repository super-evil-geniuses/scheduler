const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME || 'shiftly', process.env.DB_USER || 'sofiegraham', process.env.DB_PASS || null, { host: process.env.DB_HOST || 'localhost', dialect: 'postgres' });

// underscored = (snake_case foreign keys)
const User = sequelize.define('user', {
  name: Sequelize.STRING,
  role: Sequelize.STRING,
  password: Sequelize.STRING,
}, { underscored: true });

const Schedule = sequelize.define('schedule', {
  monday_dates: Sequelize.DATE,
}, { underscored: true });

const Employee_Availability = sequelize.define('employee_availability', {
  is_available: Sequelize.BOOLEAN,
}, { underscored: true });

const Actual_Schedule = sequelize.define('actual_schedule', {
}, {underscored: true});

const Needed_Employee = sequelize.define('needed_employee', {
  employees_needed: Sequelize.INTEGER,
}, { underscored: true });

const Day_Part = sequelize.define('day_part', {
  name: Sequelize.STRING,
}, { underscored: true });


// One-to-Many Relationships
User.hasMany(Actual_Schedule, { as: 'actual_schedule'});
User.hasMany(Employee_Availability, { as: 'employee_availability' });

Schedule.hasMany(Actual_Schedule, { as: 'actual_schedule'});
Schedule.hasMany(Needed_Employee, { as: 'needed_employee' });

Day_Part.hasMany(Employee_Availability, { as: 'employee_availability' });
Day_Part.hasMany(Actual_Schedule, { as: 'actual_schedule' });
Day_Part.hasMany(Needed_Employee, { as: 'needed_employee' });

User.sync();
Schedule.sync();
Employee_Availability.sync();
Actual_Schedule.sync();
Needed_Employee.sync();
Day_Part.sync();

module.exports = {
  User: User,
  Schedule: Schedule,
  Employee_Availability: Employee_Availability,
  Actual_Schedule: Actual_Schedule,
  Needed_Employee: Needed_Employee,
  Day_Part: Day_Part,
};