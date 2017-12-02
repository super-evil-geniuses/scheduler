const allSchedules = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.payload.data.allActualSchedules || state;

    case 'ACCEPT_TRADE':
      return action.payload.data.allActualSchedules || state;

    case 'OFFER_TRADE':
      return action.payload.data.allActualSchedules || state;

    case 'REMOVE_LOGGED_IN_DETAILS':
      return [];
      
    default:
      return state;
  }
};

export default allSchedules;
