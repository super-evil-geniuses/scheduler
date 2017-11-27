const flashMessage = (state = null, action) => {
  switch (action.type) {
  	case 'GET_ALL':
  	  return action.payload.data.flashMessage || null;
  	case 'REMOVE_LOGGED_IN_DETAILS':
  	  return 'You have logged out';
    case 'ADD_EMPLOYEE':
      return action.payload.data.flashMessage || null;  
    case 'LEAVE_ADD_EMPLOYEE':
      return null;  
  	default:
  	  return null;
  }
}; 

export default flashMessage;