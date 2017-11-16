const express = require('express');

//my part
const db = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist/compiled'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`now listening on port ${PORT}`));

db.User.sync()
db.Schedule.sync();
db.Day_Part.sync();
db.Actual_Schedule.sync();
db.Employee_Availability.sync();
db.Needed_Employee.sync();