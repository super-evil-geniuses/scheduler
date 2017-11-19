import React, { Component } from 'react';
import { connect } from 'react-redux';

class EmployeeAvailability extends Component {
  consructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {JSON.stringify(this.props.employeeAvailability)}
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

