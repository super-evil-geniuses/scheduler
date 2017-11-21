import React from 'react';
import _ from 'underscore';


const ScheduleActual = (props) => (
  <div>
    <div>date</div>
    <br></br>
    <div>
      {(() => {
        let divs = '';
        for(let i = 1; i < 15; i++) {
          divs =+ `<div id=${i}>${props.dayPartsMap[i]}</div>`;
        }
        return divs;
      })()}
    </div>
  </div>
)

const mapStateToProps = (state) => {
	let schedules = {};
  let dayPartsMap = {};
  
  state.scheduleActual.forEach( (e) => {
    schedules[e.user_id] = schedules[e.user_id] || [];
    schedules[e.user_id].push(e.day_part_id);
  });
  
  let tempObj = {};
  
  for (const sched in schedules) {
    let name = state.users.filter( (user) => {
      return user.id === sched.user_id;
    })[0].name

    tempObj[name] = schedules[sched];
  }

  schedules = tempObj;

  state.dayParts.forEach((dayPart) => {
    dayPartsMap[dayPart.id] = dayPart.name
  })

  return { schedules, dayPartsMap };
}