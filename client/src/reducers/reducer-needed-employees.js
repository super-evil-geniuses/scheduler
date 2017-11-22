const neededEmployees = (state = null, action) => {
  switch (action.type) {
    case 'GET_NEEDED_EMPLOYEES':
      return action.payload.data;
    case 'UPDATE_SCHEDULE_AVAILABILITY':
    	return state.filter((availability) => {
        return availability.schedule_id !== action.payload.data[0].schedule_id;
      }).concat(action.payload.data);
    default:
      return state;
  }
};

export default neededEmployees;
