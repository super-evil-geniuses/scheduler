const monday = new Date();
monday.setDate(monday.getDate() + (1 + 7 - monday.getDay()) % 7);

const selectedWeek = (state = monday, action) => {
	switch(action.type) {
    case 'SELECT_WEEK':
      return action.payload;
    case 'REMOVE_LOGGED_IN_DETAILS':
      return monday;
    default:
      return state;
  }
};

export default selectedWeek;