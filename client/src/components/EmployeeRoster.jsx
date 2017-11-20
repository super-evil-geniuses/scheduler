import React from 'react';
import EmployeeRosterItem from '../containers/EmployeeRosterItem.jsx';

const EmployeeRoster = (props) => {
  return (
    props.employees.map((employee) => {
      return <EmployeeRosterItem employee={employee}/>;
    })
  );
};

export default EmployeeRoster;