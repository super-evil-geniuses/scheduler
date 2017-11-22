import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addEmployee } from '../actions/index';
import PropTypes from 'prop-types';

class AddEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmployeeName: '',
    };
  }

  render() {
    return (
      <div className="list-item clear-fix clickable">
        Username:
        <input
          type="text"
          value={this.state.newEmployeeName}
          onChange={e => this.setState({ newEmployeeName: e.target.value })}
        />
        <button onClick={() => this.props.addEmployee(this.state.newEmployeeName)}>Add</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addEmployee }, dispatch);
}

AddEmployee.propTypes = {
  addEmployee: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(AddEmployee);
