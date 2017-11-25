const scheduleActual = (state = [], action) => {
	switch(action.type) {
    case 'GET_ACTUAL_SCHEDULE':
      return action.payload.data;
    case 'GET_ALL':
      return action.payload.data.scheduleActual || state;
    default:
      return state;
  }
};

export default scheduleActual;