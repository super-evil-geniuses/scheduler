const scheduleActual = (state = null, action) => {
	switch(action.type) {
    case 'GET_ACTUAL_SCHEDULE':
      return action.payload.data;
    default:
      return state;
  }
};

export default scheduleActual;