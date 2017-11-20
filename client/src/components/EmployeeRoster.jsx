import React from 'react';
import EmployeeRosterItem from '../containers/EmployeeRosterItem.jsx';
import _ from 'underscore';

const EmployeeRoster = (props) => {
  return (
    _.map(props.employees, (employee) => {
      return <EmployeeRosterItem employee={employee}/>;
    })
  );
};

export default EmployeeRoster;