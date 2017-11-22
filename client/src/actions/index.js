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


const generateSchedule = (mondayDate) => {
  const response = axios.post('/generate_schedule', { mondayDate });

  return {
    type: 'GET_ACTUAL_SCHEDULE',
    payload: response,
  }
};

const addEmployee = (username) => {
  const response = axios.post('/add_employee', { username });
  return {
    type: 'ADD_EMPLOYEE',
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

const updateScheduleAvailability = (schedule, newAvailabilities) => {
  const requestBody = Object.keys(newAvailabilities).map((dayPartId) => {
    return { schedule_id: schedule.id, day_part_id: dayPartId, employees_needed: newAvailabilities[dayPartId] };
  });

  const response = axios.patch('/schedule_availability', {
    scheduleAvailabilities: requestBody,
  });

  return {
    type: 'UPDATE_SCHEDULE_AVAILABILITY',
    payload: response,
  };
};

const changeView = (newView) => {
  return {
    type: 'CHANGE_VIEW',
    view: newView,
  }
};

module.exports = {
  generateSchedule: generateSchedule,
  updateEmployeeAvailability: updateEmployeeAvailability,
  getAllUsers: getAllUsers,
  getAllEmployeeAvailabilities: getAllEmployeeAvailabilities,
  getAllDayParts: getAllDayParts,
  getAllNeededEmployees: getAllNeededEmployees,
  updateScheduleAvailability: updateScheduleAvailability,
  getAllScheduleDates: getAllScheduleDates,
  addEmployee: addEmployee,
  changeView: changeView,
};
