import React from 'react';
import PropTypes from 'prop-types';

const EmployeeSchedule = (props) => {
  const shifts = [
    <div key="shiftblock" className="ratio-col-8 schedule-name">{props.employeeSchedule.name}
      <br />
      <span className="schedule-hours">{props.employeeSchedule.schedule.length * 6} hrs</span>
    </div>];
  for (let i = 1; i < 15; i += 1) {
    if (props.employeeSchedule.schedule.indexOf(i) !== -1) {
      shifts.push(<div
        key={`shift${props.employeeSchedule.name}${i}`}
        className="ratio-col-16 schedule-block schedule-shift-on"
      />);
    } else {
      shifts.push(<div
        key={`shift${props.employeeSchedule.name}${i}`}
        className="ratio-col-16 schedule-block schedule-shift-off" />);
    }
  }

  return (
    <div className="container schedule-row clear-fix">
      {shifts}
    </div>
  );
};

EmployeeSchedule.propTypes = {
  employeeSchedule: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EmployeeSchedule;
