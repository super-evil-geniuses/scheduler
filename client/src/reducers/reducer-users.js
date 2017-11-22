const users = (state = null, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.payload.data;
    case 'ADD_EMPLOYEE':
      return state.concat(action.payload.data.user);
    case 'GET_ALL':
      return action.payload.data.users;
    default:
      return state;
  }
};

export default users;
