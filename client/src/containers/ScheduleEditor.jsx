import React, { Component } from 'react';
import { connect } from 'react-redux';

import ScheduleTemplate from './ScheduleTemplate.jsx';

class ScheduleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSchedule: null, 
    }
  }

  selectSchedule = (id) => {
    if (id) {
      this.setState({
        selectedSchedule: this.props.scheduleNeeds[id]
      })
    } else {
      this.setState({
        selectedSchedule: {id: null, monDate: null, neededEmployees: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0}}
      })
    }
  }

  render() {
    return (
      <div className='ratio-col-1'>
        Week of:
        {this.props.scheduleNeeds && 
          <select onChange={(e) => this.selectSchedule(e.target.value)}>
            <option defaultValue='' disabled selected>Select a template...</option>
            {Object.keys(this.props.scheduleNeeds).map(id => {
              return <option value={id}>{this.props.scheduleNeeds[id].monDate.substr(0, 10)}</option>
            })}
            <option value=''>Create a new template</option>
          </select>}
        <ScheduleTemplate schedule={this.state.selectedSchedule} dayPartsMap={this.props.dayPartsMap} scheduleNeeds={this.props.scheduleNeeds}/>
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
    selectedWeek: state.selectedWeek
  };
};

export default connect(mapStateToProps)(ScheduleEditor);
