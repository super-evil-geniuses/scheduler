const scheduleActual = (state = null, action) => {
	switch(action.type) {
    case 'GET_ACTUAL_SCHEDULE':
      if(state) {
        console.log('STATE: ', state);
        console.log('ACTION: ', action);
        const filteredState = state.filter((el) => {
          return el.schedule_id !== action.payload.data[0].schedule_id;
        });
        return filteredState.concat(action.payload.data);
      } else {
        return action.payload.data;
      }
    case 'GET_ALL':
      return action.payload.data.scheduleActual || state;
    case 'REMOVE_LOGGED_IN_DETAILS':
      return null;
    default:
      return state;
  }
};

export default scheduleActual;