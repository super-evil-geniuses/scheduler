import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addEmployee } from '../actions/index';
import { leaveAddEmployee } from '../actions/index';
// import FlashMessage from '../components/FlashMessage.jsx';

import PropTypes from 'prop-types';

class AddEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmployeeName: '',
      newEmployeePassword: '',
    };
  }

  componentWillUnmount() {
    this.props.leaveAddEmployee();
  }

  render() {
    return (
      <div>
        <h4>Create a new employee</h4>
        <p>Please create a username and a temporary password for your employee's account.</p>
        <label className="credentials-label">Username:</label>
        <input
          className="credentials-input"
          type="text"
          value={this.state.newEmployeeName}
          onChange={e => this.setState({ newEmployeeName: e.target.value })}
        />
        <br></br>
        <label className="credentials-label">Password:</label>
        <input
          className="credentials-input"
          type="text"
          value={this.state.newEmployeePassword}
          onChange={e => this.setState({ newEmployeePassword: e.target.value })}
        />
        <div className="btn-credentials">
          <button className='btn-main clickable' onClick={() => this.props.addEmployee(this.state.newEmployeeName, this.state.newEmployeePassword)}>Add</button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addEmployee: addEmployee,
    leaveAddEmployee: leaveAddEmployee,
  }, dispatch);
}

AddEmployee.propTypes = {
  addEmployee: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AddEmployee);
