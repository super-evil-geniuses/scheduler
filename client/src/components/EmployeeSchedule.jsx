import React from 'react';
import Off from './Off.jsx';
import Shift from './Shift.jsx';

const EmployeeSchedule = props => (
  <div>
    <div>
      {props.schedule.name}
      <br></br>
      {'Hours: ' + (props.schedule.schedule.length * 6)}
    </div>
    <br></br>
    {(() => {
    	let shifts = [];
  	  for (let i = 1; i < 15; i++) {
  	  	if (props.schedule.schedule.indexOf(i) !== -1) {
  	  		shifts.push(<Shift />)
  	  	} else {
  	  		shifts.push(<Off />)
  	  	}
  	  }
      return shifts;
    })()}
  </div>
)

export default EmployeeSchedule;
