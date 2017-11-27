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
      <div className="list-item clear-fix clickable">
        Username:
        <input
          className="Username"
          type="text"
          value={this.state.newEmployeeName}
          onChange={e => this.setState({ newEmployeeName: e.target.value })}
        />
        <br></br>
        Password:
        <input
          className="Password"
          type="text"
          value={this.state.newEmployeePassword}
          onChange={e => this.setState({ newEmployeePassword: e.target.value })}
        />
        <button onClick={() => this.props.addEmployee(this.state.newEmployeeName, this.state.newEmployeePassword)}>Add</button>
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
