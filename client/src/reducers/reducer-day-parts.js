const dayParts = (state = null, action) => {
  switch (action.type) {
    case 'GET_DAY_PARTS':
      return action.payload.data;
    default:
      return state;
  }
};

export default dayParts;
