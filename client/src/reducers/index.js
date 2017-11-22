import { combineReducers } from 'redux';
import EmployeeAvailabilitiesReducer from './reducer-employee-availabilities.js';
// import EmployeesReducer from './reducer-employees.js';
import UsersReducer from './reducer-users.js';
import DayPartsReducer from './reducer-day-parts.js';
import NeededEmployeesReducer from './reducer-needed-employees.js';
import ScheduleDatesReducer from './reducer-schedule-dates.js';
import ScheduleActual from './reducer-schedule-actual.js';
import View from './reducer-view.js';

const rootReducer = combineReducers({
  employeeAvailabilities: EmployeeAvailabilitiesReducer,
  scheduleActual: ScheduleActual,
  view: View,
  //employees: EmployeesReducer,
  //selectedEmployee: SelectedEmployeeReducer,
  users: UsersReducer,
  dayParts: DayPartsReducer,
  neededEmployees: NeededEmployeesReducer,
  scheduleDates: ScheduleDatesReducer,
  view: View,
});

export default rootReducer;
