import React from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import EmployeeSchedule from './EmployeeSchedule.jsx';


const ScheduleActual = (props) => {

  let morningEvenings = [<div key={'block'} className="ratio-col-8 schedule-block schedule-hours"></div>];

  for (let i = 0; i < 14; i++) {
    morningEvenings.push(<div key={`${i}shift`} className="ratio-col-16 schedule-block  schedule-hours">{i % 2 === 0 ? 'AM' : 'PM'}</div>)
  }

  return (
    <div className="container clear-fix schedule-actual">
      <div className="schedule-date-header">
        <div className="ratio-col-8 schedule-block "/>
        <div className="ratio-col-8 schedule-block ">Mon</div>
        <div className="ratio-col-8 schedule-block ">Tue</div>
        <div className="ratio-col-8 schedule-block ">Wed</div>
        <div className="ratio-col-8 schedule-block ">Thur</div>
        <div className="ratio-col-8 schedule-block ">Fri</div>
        <div className="ratio-col-8 schedule-block ">Sat</div>
        <div className="ratio-col-8 schedule-block ">Sun</div>
        {morningEvenings}
      </div>
        {props.schedules.map((sched,idx) => {
          return <EmployeeSchedule key={`${sched.name}${idx}`} schedule={sched} />;
        })}
    </div>
  )
  
}

const mapStateToProps = (state) => {
	let schedules = {};
  let scheduleArr = [];
  //let dayPartsMap = {};
  if (state.scheduleActual) {
    state.scheduleActual.forEach( (e) => {
      if(e.user_id === null) {
        schedules['HOUSE'] = schedules['HOUSE'] || [];
        schedules['HOUSE'].push(e.day_part_id);
      } else {
        schedules[e.user_id] = schedules[e.user_id] || [];
        schedules[e.user_id].push(e.day_part_id);
      }
    });
    
    for (const sched in schedules) {
      let schedObj = {}
      if (sched === 'HOUSE') {
        schedObj.name = 'HOUSE';
        schedObj.schedule = schedules[sched];
      } else {
        schedObj.name = state.users.filter( (user) => {
          return user.id == sched;
        })[0].name

        schedObj.schedule = schedules[sched];
      }

      scheduleArr.push(schedObj);
    }
  }
  
  // if(state.dayParts) {
  //   let forwardFacingDayParts = [
  //     null,
  //     'Monday AM',
  //     'Monday PM',
  //     'Tuesday AM',
  //     'Tuesday PM',
  //     'Wednesday AM',
  //     'Wednesday PM',
  //     'Thursday AM',
  //     'Thursday PM',
  //     'Friday AM',
  //     'Friday PM',
  //     'Saturday AM',
  //     'Saturday PM',
  //     'Sunday AM',
  //     'Sunday PM',
  //   ];
  //   state.dayParts.forEach((dayPart) => {
  //     dayPartsMap[dayPart.id] = forwardFacingDayParts[dayPart.id];
  //   })
  // }

  return { schedules: scheduleArr };
}

export default connect(mapStateToProps)(ScheduleActual);