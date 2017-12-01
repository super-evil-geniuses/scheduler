const userRole = (state = '', action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.payload.data.role || state;
  }
  return state;
};

export default userRole;
