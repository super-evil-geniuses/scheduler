const userRole = (state = '', action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.payload.data.role || state;
    case 'OFFER_TRADE':
      return action.payload.data.role || state;
  }
  return state;
};

export default userRole;
