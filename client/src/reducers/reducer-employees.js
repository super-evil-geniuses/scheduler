const employeeData = [{
  id: 1,
  name: 'Lucas',
  availabilities: {
    monA: true,
    monP: false,
    tuesA: true,
    tuesP: false,
    wedsA: true,
    wedsP: false,
    thursA: true,
    thursP: false,
    friA: true,
    friP: false,
    satA: true,
    satP: false,
    sunA: false,
    sunP: false,
  }}, {
  id: 2,
  name: 'Michael',
  availabilities: {
    monA: true,
    monP: false,
    tuesA: true,
    tuesP: false,
    wedsA: true,
    wedsP: false,
    thursA: true,
    thursP: false,
    friA: true,
    friP: false,
    satA: true,
    satP: false,
    sunA: true,
    sunP: true,
  }
}]

const employees = (state = employeeData, action) => {
  switch (action.type) {
    case 'UPDATE_EMPLOYEE_AVAILABILITY':
    //find index of employee we need to modify
    const newState = state;
    debugger;
    console.log(action.payload.data);
    newState[1].availabilities = JSON.parse(action.payload.data);

    // [
    //   { user_id: 1 , day_part_id: 1, is_available: true },
    //   { user_id: 1 , day_part_id: 2, is_available: true },
    //   { user_id: 1 , day_part_id: 3, is_available: true },
    //   { user_id: 1 , day_part_id: 4, is_available: true },
    //   { user_id: 1 , day_part_id: 5, is_available: true },
    //   { user_id: 1 , day_part_id: 6, is_available: true },
    //   { user_id: 1 , day_part_id: 7, is_available: true },
    //   { user_id: 1 , day_part_id: 8, is_available: true },
    //   { user_id: 1 , day_part_id: 9, is_available: true },
    //   { user_id: 1 , day_part_id: 10, is_available: true },
    //   { user_id: 1 , day_part_id: 11, is_available: true },
    //   { user_id: 1 , day_part_id: 12, is_available: true },
    //   { user_id: 1 , day_part_id: 13, is_available: true },
    //   { user_id: 1 , day_part_id: 14, is_available: true },
    // ]
      return newState;
    default:
      return state;
  }
};

export default employees;
