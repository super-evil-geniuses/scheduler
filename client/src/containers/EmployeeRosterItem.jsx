import React from 'react';

const EmployeeRosterItem = (props) => {
  return (
    <div onClick={() => props.selectEmployee(props.employee)}>
      {props.employee.name}
    </div>
  );
};

export default EmployeeRosterItem;
