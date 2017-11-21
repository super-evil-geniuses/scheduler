import React, { Component } from 'react';
import { connect } from 'react-redux';

import ScheduleAvailability from './ScheduleAvailability.jsx';

class ScheduleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSchedule: null, 
    }
  }

  selectSchedule = (schedule) => {
    this.setState({
      selectedSchedule: schedule
    })
  }

  render() {
    return (
      <div className='ratio-col-1'>
        <ScheduleAvailability schedule={this.state.selectedSchedule} dayPartsMap={this.props.dayPartsMap} />
        {this.props.scheduleNeeds && 
          <div onClick={(e) => this.selectSchedule(this.props.scheduleNeeds[1])}>
            Select schedule test
          </div>}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  let scheduleNeeds;
  const dayPartsMap = {};
  if (state.neededEmployees && state.scheduleDates) {
    scheduleNeeds = state.scheduleDates.reduce((acc, scheduleDate) => {
      acc[scheduleDate.id] = {
        id: scheduleDate.id,
        monDate: scheduleDate.monday_dates,
        neededEmployees: {},
      };
      return acc;
    }, {});

    state.neededEmployees.forEach((requirement) => {
      scheduleNeeds[requirement.schedule_id].neededEmployees[requirement.day_part_id] = requirement.employees_needed;
    });
  }

  if (state.dayParts) {
    state.dayParts.forEach((dayPart) => {
      dayPartsMap[dayPart.id] = dayPart.name;
    });
  }

  return {
    dayPartsMap: dayPartsMap,
    scheduleNeeds: scheduleNeeds,
  };
};

export default connect(mapStateToProps)(ScheduleEditor);
