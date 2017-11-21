const neededEmployees = (state = null, action) => {
  switch (action.type) {
    case 'GET_NEEDED_EMPLOYEES':
      return action.payload.data;
    default:
      return state;
  }
};

export default neededEmployees;
