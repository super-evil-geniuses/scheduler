import axios from 'axios';

const getAllUsers = () => {
  const response = axios.get('/users');

  return {
    type: 'GET_USERS',
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


const updateEmployeeAvailability = (employee, newAvailability) => {
  const requestBody = Object.keys(newAvailability).map((dayPart) => {
    return { user_id: employee.id, day_part_id: dayPart, is_available: newAvailability[dayPart] };
  });

  const response = axios.post('/employee_availability', {
    employeeAvailabilities: requestBody,
  }); // this will return a promise, which the redux-promise middleware will WAIT for before it sends the action to reducers
  console.log('RESPONSE', response);
  return {
    type: 'UPDATE_EMPLOYEE_AVAILABILITY',
    payload: response,
  };
};

const selectEmployee = (employee) => {
  return {
    type: 'SELECT_EMPLOYEE',
    payload: employee,
  };
};

module.exports = {
  updateEmployeeAvailability: updateEmployeeAvailability,
  selectEmployee: selectEmployee,
  getAllUsers: getAllUsers,
  getAllEmployeeAvailabilities: getAllEmployeeAvailabilities,
  getAllDayParts: getAllDayParts,
};
