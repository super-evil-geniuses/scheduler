require('dotenv').config();
const express = require('express');
const utils = require('../helpers');

const app = express();

app.use(express.static(__dirname + '/../client/dist/compiled'));

app.patch('/employee_availability/:employeeId', utils.updateEmployeeAvailability, (req, res) => {
  res.end();
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`now listening on port ${PORT}`));
