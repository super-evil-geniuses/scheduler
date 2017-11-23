const view = (state = 'login', action) => {
	switch(action.type) {
    case 'CHANGE_VIEW':
      return action.view;
    case 'GET_ALL':
      return action.payload.data.view || state;
    default:
      return state;
  }
};

export default view;