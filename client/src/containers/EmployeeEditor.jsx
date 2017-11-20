import React, { Component } from 'react';
import EmployeeAvailability from './EmployeeAvailability.jsx';
import EmployeeRoster from '../components/EmployeeRoster.jsx';
import { connect } from 'react-redux';

class EmployeeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEmployee: null,
    };
  }

  selectEmployee = (employee) => {
    this.setState({
      selectedEmployee: employee
    })
  }

  render() {
    return (
      <div>
        <EmployeeAvailability employee={this.state.selectedEmployee} />
        {this.props.employees && 
        <EmployeeRoster 
          employees={this.props.employees}
          selectEmployee={this.selectEmployee}
        />}
      </div>
    );
  }
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
    employees: employees,
  };
  
};

export default connect(mapStateToProps)(EmployeeEditor);
