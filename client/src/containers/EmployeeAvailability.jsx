import React, { Component } from 'react';
import { connect } from 'react-redux';

import EmployeeAvailabilityCheckboxes from '../components/EmployeeAvailabilityCheckboxes.jsx';

class EmployeeAvailability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAvailabilities: {},
      selectedEmployee: [],
    };
  }

  handleEmployeeSelect = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: this.props.employeeAvailability[e.target.value]
    });
  }

  render() {
    const employeeList = this.props.employeeAvailability.map((employeeAvail, idx) => {
      return <option key={idx} value={idx}>{employeeAvail[0].name}</option>;
    });

    return (
      <div>
        <h2>Edit Employee Availability</h2>
        <form onSubmit={console.log('submit')}>
          <select onChange={this.handleEmployeeSelect} className="create-input" name='selectedEmployee'>
          <option disabled selected value> -- select an employee -- </option>
            {employeeList}
          </select>
          <EmployeeAvailabilityCheckboxes availabilities={this.state.selectedEmployee}/>
          <button className="create-submit-button" type="submit">Save</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employeeAvailability: state.employeeAvailability
  };
};

export default connect(mapStateToProps /*, mapDispatchToProps*/)(EmployeeAvailability);
