const scheduleActual = (state = null, action) => {
  switch (action.type) {
    case 'DELETE_SHIFT':
      if (state) {
        const filteredState = state.filter((shift) => {
          return (
            // user_id is an integer and userId is a string
            !(shift.user_id == action.payload.userId && shift.schedule_id === action.payload.scheduleId && shift.day_part_id === action.payload.shift)
          );
        });
        return filteredState;
      }
      return state;

    case 'ADD_SHIFT':
      if (state) {
        console.log(action)
        console.log('REDUCER USERID :', action.payload.userId)
        console.log('REDUCER SCHEDULEID :', action.payload.scheduleId)
        console.log('REDUCER SHIFT :', action.payload.shift)
        return state.concat([{
          user_id: action.payload.userId ? action.payload.userId.toString() : null,
          schedule_id: action.payload.scheduleId,
          day_part_id: action.payload.shift,
        }]);
      }
      return state;

    case 'SAVE_PREFERENCES':
      if (state) {
        return action.payload.data;
      }
      return state;

    case 'GET_ACTUAL_SCHEDULE':
      if (state) {
        const filteredState = state.filter((el) => {
          return el.schedule_id !== action.payload.data[0].schedule_id;
        });
        return filteredState.concat(action.payload.data);
      }
      return action.payload.data;

    case 'GET_ALL':
      return action.payload.data.scheduleActual || state;

    case 'REMOVE_LOGGED_IN_DETAILS':
      return null;
      
    default:
      return state;
  }
};

export default scheduleActual;