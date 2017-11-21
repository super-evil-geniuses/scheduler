import axios from 'axios';

const getAllUsers = () => {
  const response = axios.get('/users');

  return {
    type: 'GET_USERS',
    payload: response,
  };
};

const getAllScheduleDates = () => {
  const response = axios.get('/schedule_dates');

  return {
    type: 'GET_SCHEDULE_DATES',
    payload: response,
  };
};

const getAllEmployeeAvailabilities = () => {
  const response = axios.get('/employee_availabilities');

  return {
    type: 'GET_EMPLOYEE_AVAILABILITIES',
    payload: response,
  };
};

const getAllDayParts = () => {
  const response = axios.get('/day_parts');

  return {
    type: 'GET_DAY_PARTS',
    payload: response,
  };
};

const getAllNeededEmployees = () => {
  const response = axios.get('/needed_employees');

  return {
    type: 'GET_NEEDED_EMPLOYEES',
    payload: response,
  };
};


const updateEmployeeAvailability = (employee, newAvailabilities) => {
  const requestBody = Object.keys(newAvailabilities).map((dayPartId) => {
    return { user_id: employee.id, day_part_id: dayPartId, is_available: newAvailabilities[dayPartId] };
  });

  const response = axios.patch('/employee_availability', {
    employeeAvailabilities: requestBody,
  });

  return {
    type: 'UPDATE_EMPLOYEE_AVAILABILITY',
    payload: response,
  };
};

module.exports = {
  updateEmployeeAvailability: updateEmployeeAvailability,
  getAllUsers: getAllUsers,
  getAllEmployeeAvailabilities: getAllEmployeeAvailabilities,
  getAllDayParts: getAllDayParts,
  getAllNeededEmployees: getAllNeededEmployees,
  getAllScheduleDates: getAllScheduleDates,
};
