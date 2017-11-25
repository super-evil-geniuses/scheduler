const scheduleDates = (state = null, action) => {
  switch (action.type) {
    case 'GET_SCHEDULE_DATES':
      return action.payload.data;
    case 'GET_ALL':
      return action.payload.data.scheduleDates || state;
    case 'CREATE_SCHEDULE_TEMPLATE':
    	return state.concat(action.payload.data.monday_date);
    default:
      return state;
  }
};

export default scheduleDates;
