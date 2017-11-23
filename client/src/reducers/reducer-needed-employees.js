const neededEmployees = (state = null, action) => {
  switch (action.type) {
    case 'GET_NEEDED_EMPLOYEES':
      return action.payload.data;
    case 'GET_ALL':
      return action.payload.data.neededEmployees || state;
    default:
      return state;
  }
};

export default neededEmployees;
