const scheduleDates = (state = null, action) => {
  switch (action.type) {
    case 'GET_SCHEDULE_DATES':
      return action.payload.data;
    default:
      return state;
  }
};

export default scheduleDates;
