const trades = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.payload.data.trades || state;
    case 'ACCEPT_TRADE':
      return action.payload.data.trades || state;
  }
  return state;
};

export default trades;
