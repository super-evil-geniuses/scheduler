import React from 'react';
import EmployeeRosterItem from '../containers/EmployeeRosterItem.jsx';
import _ from 'underscore';
import PropTypes from 'prop-types';

const renderAddEmployee = (selectEmployee) => {
  return (
    <div className="list-item clear-fix clickable" onClick={() => selectEmployee('create')}>
      <div className="ratio-col-4-3" >
        <div>
          <i className="material-icons employee-edit-profile">account_circle</i>
          <span>Add new employee</span>
        </div>
      </div>
      <div className="ratio-col-4" >
        <div className="employee-edit">
          <i className="material-icons employee-edit-button">add_circle</i>
        </div>
      </div>
    </div>
  );
};

const EmployeeRoster = (props) => {
  return (
    <div>
      {props.userRole === 'manager' && renderAddEmployee(props.selectEmployee)}
      {props.employees && _.map(props.employees, (employee) => {
        return <EmployeeRosterItem key={employee.id} employee={employee} selectEmployee={props.selectEmployee}/>;
      })}
    </div>
  );
};

EmployeeRoster.propTypes = {
  selectEmployee: PropTypes.func.isRequired,
  employees: PropTypes.objectOf(PropTypes.any),
  userRole: PropTypes.string.isRequired,
};

export default EmployeeRoster;
