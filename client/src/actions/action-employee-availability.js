import axios from 'axios';

const updateEmployeeAvailability = (employeeAvailabilityObj) => {
  const employeeId = employeeAvailabilityObj.id;
  const response = axios.post(`/employee_availability/${employeeId}`); // this will return a promise, which the redux-promise middleware will WAIT for before it sends the action to reducers

  return {
    type: 'UPDATE_EMPLOYEE_AVAILABILITY',
    payload: response,
  };
};

export default updateEmployeeAvailability;
