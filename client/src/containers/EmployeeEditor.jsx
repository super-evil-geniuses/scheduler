import React from 'react';
// import EmployeeAvailability1 from '../components/EmployeeAvailability1.jsx';
import EmployeeRoster from '../components/EmployeeRoster.jsx';
import { connect } from 'react-redux';

const EmployeeEditor = (props) => {
  return (
    <div>
      {/* <EmployeeAvailability1 /> */}
      {props.employees && <EmployeeRoster employees={props.employees}/>}
    </div>
  );
};

const mapStateToProps = (state) => {
  let employees;
  if(state.users && state.employeeAvailabilities) {
    employees = state.users.filter((user) => {
      return user.role === 'employee';
    }).reduce((acc, employee) => {
      acc[employee.id] = {
        id: employee.id,
        name: employee.name,
        availabilities: {},
      };
      return acc;
    }, {});
  
    state.employeeAvailabilities.forEach((availability) => {
      employees[availability.user_id].availabilities[availability.day_part_id] = availability.is_available;
    });
  }
  
  return {
    users: state.users,
    dayParts: state.dayParts,
    selectedEmployee: state.selectedEmployee,
    employees: employees,
  };
  
};

export default connect(mapStateToProps)(EmployeeEditor);
