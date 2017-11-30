const userRole = (state = null, action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.payload.data.role;
  }
  return state;
};

export default userRole;
