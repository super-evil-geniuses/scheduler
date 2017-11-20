import { combineReducers } from 'redux';
import EmployeeAvailabilitiesReducer from './reducer-employee-availabilities.js';
// import EmployeesReducer from './reducer-employees.js';
import UsersReducer from './reducer-users.js';
import DayPartsReducer from './reducer-day-parts.js';

const rootReducer = combineReducers({
  employeeAvailabilities: EmployeeAvailabilitiesReducer,
  //employees: EmployeesReducer,
  //selectedEmployee: SelectedEmployeeReducer,
  users: UsersReducer,
  dayParts: DayPartsReducer,
});

export default rootReducer;
