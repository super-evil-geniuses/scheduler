import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEmployee } from '../actions/index';

const EmployeeRosterItem = (props) => {
  return (
    <div onClick={() => props.selectEmployee(props.employee)}>
      {props.employee.name}
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectEmployee: selectEmployee}, dispatch);
}

export default connect(null, mapDispatchToProps)(EmployeeRosterItem);
