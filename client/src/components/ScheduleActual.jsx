import React from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import EmployeeSchedule from './EmployeeSchedule.jsx';


const ScheduleActual = (props) => (
  <div>
    <div>todo date</div>
    <br></br>
    <div>
      {(() => {
        let divs = [];
          if (props.dayPartsMap) {
            for(let i = 1; i < 15; i++) {
              divs.push(<div key={i}>{props.dayPartsMap[i]}</div>);
            }
          }
        return divs;
      })()}
      <br></br><br></br>
      {props.schedules.map((sched) => {
        return <EmployeeSchedule schedule={sched} />;
      })
      }
    </div>
  </div>
)

const mapStateToProps = (state) => {
	let schedules = {};
  let scheduleArr = [];
  let dayPartsMap = {};
  if (state.scheduleActual) {
    state.scheduleActual.forEach( (e) => {
      schedules[e.user_id] = schedules[e.user_id] || [];
      schedules[e.user_id].push(e.day_part_id);
    });
    
    for (const sched in schedules) {
      let schedObj = {}
      schedObj.name = state.users.filter( (user) => {
        return user.id == sched;
      })[0].name

      schedObj.schedule = schedules[sched];
      scheduleArr.push(schedObj);
    }
  }
  
  if(state.dayParts) {
    let forwardFacingDayParts = [
      null,
      'Monday AM',
      'Monday PM',
      'Tuesday AM',
      'Tuesday PM',
      'Wednesday AM',
      'Wednesday PM',
      'Thursday AM',
      'Thursday PM',
      'Friday AM',
      'Friday PM',
      'Saturday AM',
      'Saturday PM',
      'Sunday AM',
      'Sunday PM',
    ];
    state.dayParts.forEach((dayPart) => {
      dayPartsMap[dayPart.id] = forwardFacingDayParts[dayPart.id];
    })
  }

  return { schedules: scheduleArr, dayPartsMap };
}

export default connect(mapStateToProps)(ScheduleActual);