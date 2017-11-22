const users = (state = null, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.payload.data;
    case 'ADD_EMPLOYEE':
      return state.concat(action.payload.data);
    default:
      return state;
  }
};

export default users;
