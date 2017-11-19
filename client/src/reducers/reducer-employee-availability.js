const employeeAvailability = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_EMPLOYEE_AVAILABILITY':
      state[action.payload.id] = action.payload;
      return state;
    default:
      return state;
  }
};

export default employeeAvailability;
