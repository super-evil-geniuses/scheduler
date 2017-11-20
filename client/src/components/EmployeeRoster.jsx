import React from 'react';
import EmployeeRosterItem from './EmployeeRosterItem.jsx';
import _ from 'underscore';

const EmployeeRoster = (props) => {
  return (
    <div>
      <h2>Employee Roster</h2>
      {_.map(props.employees, (employee) => {
        return <EmployeeRosterItem key={employee.id} employee={employee} selectEmployee={props.selectEmployee}/>;
      })}
    </div>
  );
};

export default EmployeeRoster;