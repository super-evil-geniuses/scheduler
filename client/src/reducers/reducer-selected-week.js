const monday = new Date();
monday.setDate(monday.getDate() + (1 + 7 - monday.getDay()) % 7);

const selectedWeek = (state = monday, action) => {
	switch(action.type) {
    case 'SELECT_WEEK':
      return action.payload;
    default:
      return state;
  }
};

export default selectedWeek;