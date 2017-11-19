import { combineReducers } from 'redux';
import EmployeeAvailabilityReducer from './reducer-employee-availability.js';


const rootReducer = combineReducers({
  employeeAvailability: EmployeeAvailabilityReducer,
});

export default rootReducer;
