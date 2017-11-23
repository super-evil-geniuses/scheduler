import React from 'react';
import Off from './Off.jsx';
import Shift from './Shift.jsx';

const EmployeeSchedule = (props) => {
  let shifts = [<div key="shiftblock" className="ratio-col-8 schedule-name">{props.schedule.name}<br/><span className="schedule-hours">{props.schedule.schedule.length * 6}</span></div>];
  for (let i = 1; i < 15; i++) {
    if (props.schedule.schedule.indexOf(i) !== -1) {
      shifts.push(<div key={`shift${props.schedule.name}${i}`} className="ratio-col-16 schedule-block schedule-shift-on"></div>)
    } else {
      shifts.push(<div key={`shift${props.schedule.name}${i}`}  className="ratio-col-16 schedule-block schedule-shift-off"></div>)
    }
  }

  return (
    <div className="container schedule-row clear-fix">
      {shifts}
    </div>
  );
};


export default EmployeeSchedule;
