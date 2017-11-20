import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEmployee } from '../actions/index';
import { getAllUsers } from '../actions/index';
import { getAllEmployeeAvailabilities } from '../actions/index';
import { getAllDayParts } from '../actions/index';


import EmployeeRoster from '../components/EmployeeRoster.jsx';

import EmployeeAvailabilityCheckboxes from '../components/EmployeeAvailabilityCheckboxes.jsx';

class EmployeeAvailability extends Component {

  componentDidMount() {
    this.props.getAllUsers();
    this.props.getAllEmployeeAvailabilities();
    this.props.getAllDayParts();
  }

  handleEmployeeSelect = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: this.props.employeeAvailability[e.target.value]
    });
  }

  render() {

    return (
      <div>
        <h2>Edit Employee Availability</h2>
          {this.props.selectedEmployee && <EmployeeAvailabilityCheckboxes employee={this.props.selectedEmployee}/>}
          <button className="create-submit-button" type="submit">Save</button>
        {this.props.employees && <EmployeeRoster employees={this.props.employees} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
    selectedEmployee: state.selectedEmployee,
    users: state.users,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectEmployee: selectEmployee,
    getAllUsers: getAllUsers,
    getAllEmployeeAvailabilities: getAllEmployeeAvailabilities,
    getAllDayParts: getAllDayParts,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAvailability);
