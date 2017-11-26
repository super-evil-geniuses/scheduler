const flashMessage = (state = null, action) => {
  switch (action.type) {
  	case 'GET_ALL':
  	  return action.payload.data.flashMessage || null;
  	case 'REMOVE_LOGGED_IN_DETAILS':
  	  return 'You have logged out';
  	default:
  	  return state;
  }
}; 

export default flashMessage;