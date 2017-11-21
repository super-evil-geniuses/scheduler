import React from 'react';

const EmployeeSchedule = (props) => (
  <div>
    {props.schedule.name}
    <br></br>
    {props.schedule.schedule}
  </div>
)

export default EmployeeSchedule;