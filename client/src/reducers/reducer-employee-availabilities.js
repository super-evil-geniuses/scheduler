const employeeAvailabilities = (state = null, action) => {
  switch (action.type) {
    case 'GET_EMPLOYEE_AVAILABILITIES':
      return action.payload.data;
    default:
      return state;
  }
};

export default employeeAvailabilities;
