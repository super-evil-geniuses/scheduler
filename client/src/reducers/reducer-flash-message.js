const flashMessage = (state = null, action) => {
  switch (action.type) {
  	case 'GET_ALL':
  	  return action.payload.data.flashMessage || null;
  	default:
  	  return state;
  }
}; 

export default flashMessage;