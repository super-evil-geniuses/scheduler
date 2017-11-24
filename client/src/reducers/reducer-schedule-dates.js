const scheduleDates = (state = null, action) => {
  switch (action.type) {
    case 'GET_SCHEDULE_DATES':
      return action.payload.data;
    case 'GET_ALL':
      return action.payload.data.scheduleDates || state;
    default:
      return state;
  }
};

export default scheduleDates;
