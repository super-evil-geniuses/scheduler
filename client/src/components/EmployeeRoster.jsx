import React from 'react';
import EmployeeRosterItem from '../containers/EmployeeRosterItem.jsx';
import _ from 'underscore';

const EmployeeRoster = (props) => {
  return (
    <div>
      <div className="mdl-list__item list-item">
      <span className="mdl-list__item-primary-content">
        <i className="material-icons mdl-list__item-avatar">account_circle</i>
        <span>Add an employee</span>
      </span>
      <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
        <i class="material-icons">add</i>
      </button>
    </div>
      {_.map(props.employees, (employee) => {
        return <EmployeeRosterItem key={employee.id} employee={employee} selectEmployee={props.selectEmployee}/>;
      })}
    </div>
  );
};

export default EmployeeRoster;