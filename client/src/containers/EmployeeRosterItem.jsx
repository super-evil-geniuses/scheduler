import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEmployee } from '../actions/index';

const EmployeeRosterItem = (props) => {
  return (
    <div className="mdl-list__item list-item" onClick={() => props.selectEmployee(props.employee)}>
      <span className="mdl-list__item-primary-content">
        <i className="material-icons mdl-list__item-avatar">account_circle</i>
        <span>{props.employee.name}</span>
      </span>
      <a className="mdl-list__item-secondary-action" href="#"><i className="material-icons">mode edit</i></a>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectEmployee: selectEmployee}, dispatch);
}

export default connect(null, mapDispatchToProps)(EmployeeRosterItem);
