// const employeeAvail = [[
//   { name: 'Lucas', day_part: 'monA', is_available: true },
//   { name: 'Lucas', day_part: 'monP', is_available: true },
//   { name: 'Lucas', day_part: 'tuesA', is_available: true },
//   { name: 'Lucas', day_part: 'tuesP', is_available: false },
//   { name: 'Lucas', day_part: 'wedsA', is_available: true },
//   { name: 'Lucas', day_part: 'wedsP', is_available: true },
//   { name: 'Lucas', day_part: 'thursA', is_available: true },
//   { name: 'Lucas', day_part: 'thursP', is_available: false },
//   { name: 'Lucas', day_part: 'friA', is_available: true },
//   { name: 'Lucas', day_part: 'friP', is_available: true },
//   { name: 'Lucas', day_part: 'satA', is_available: true },
//   { name: 'Lucas', day_part: 'satP', is_available: true },
//   { name: 'Lucas', day_part: 'sunA', is_available: false },
//   { name: 'Lucas', day_part: 'sunP', is_available: false },
// ],
// [
//   { name: 'Michael', day_part: 'monA', is_available: true },
//   { name: 'Michael', day_part: 'monP', is_available: true },
//   { name: 'Michael', day_part: 'tuesA', is_available: true },
//   { name: 'Michael', day_part: 'tuesP', is_available: true },
//   { name: 'Michael', day_part: 'wedsA', is_available: false },
//   { name: 'Michael', day_part: 'wedsP', is_available: false },
//   { name: 'Michael', day_part: 'thursA', is_available: false },
//   { name: 'Michael', day_part: 'thursP', is_available: false },
//   { name: 'Michael', day_part: 'friA', is_available: false },
//   { name: 'Michael', day_part: 'friP', is_available: false },
//   { name: 'Michael', day_part: 'satA', is_available: false },
//   { name: 'Michael', day_part: 'satP', is_available: false },
//   { name: 'Michael', day_part: 'sunA', is_available: true },
//   { name: 'Michael', day_part: 'sunP', is_available: true },
// ]]


const employeeAvailabilities = (state = null, action) => {
  switch (action.type) {
    case 'GET_EMPLOYEE_AVAILABILITIES':
      return action.payload.data;
    default:
      return state;
  }
};

export default employeeAvailabilities;
