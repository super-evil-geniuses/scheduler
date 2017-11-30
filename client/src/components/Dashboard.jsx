import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import EmployeeEditor from '../containers/EmployeeEditor.jsx';
import ScheduleEditor from '../containers/ScheduleEditor.jsx';
import ScheduleGenerator from '../containers/ScheduleGenerator.jsx';
import ScheduleActual from './ScheduleActual.jsx';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'scheduleEditor',
    };
  }

  render() {
    let editorView;
    let employeeStyle = 'ratio-col-2 editor-tab clickable';
    let scheduleStyle ='ratio-col-2 editor-tab clickable';
    if(this.state.currentView === 'employeeEditor') {
      editorView = <EmployeeEditor />;
      employeeStyle = 'ratio-col-2 editor-tab selected-tab';
    } else {
      editorView = <ScheduleEditor />;
      scheduleStyle = 'ratio-col-2 editor-tab selected-tab';
    }

    return (
      <div className="dashboard-container">
        <div className="ratio-col-4 major-component">
          <div className="component-block">
            <div className="editor-header">
              <div className="container clear-fix">
                <div className={employeeStyle} onClick={() => { this.setState({currentView: 'employeeEditor' })}}>Employees</div>
                <div className={scheduleStyle} onClick={() => { this.setState({currentView: 'scheduleEditor' })}}>Shifts</div>
              </div>
            </div>
          {editorView}
          </div>
        </div>
        <div className="ratio-col-4-3 major-component">
          <div className="component-block">
            <ScheduleGenerator
              selectedWeek={this.props.selectedWeek}
              weekHasActualSchedule={this.props.weekHasActualSchedule}
              weekHasAtLeastOneNeededEmployee={this.props.weekHasAtLeastOneNeededEmployee}
            />
            <ScheduleActual
              selectedWeek={this.props.selectedWeek}
              weekHasActualSchedule={this.props.weekHasActualSchedule}
              weekHasAtLeastOneNeededEmployee={this.props.weekHasAtLeastOneNeededEmployee}
              selectedWeekActualSchedule={this.props.selectedWeekActualSchedule}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let scheduleId = null;
  let weekHasActualSchedule = false;
  let weekHasAtLeastOneNeededEmployee = false;
  let actualSchedule = null;
  
  // check to see if any schedules have been generated
  if (state.scheduleDates) {
    // if any have been, iterate through them and attempt to return
    // the one that matches state.selectedWeek (currently selected week from dropdown menu)
    const selectedWeekObj = state.scheduleDates.find((el) => {
      return el.monday_dates.toString().substr(0, 10) === state.selectedWeek;
    });
    // if a match was found (i.e. the current week has a generated schedule),
    // pass the schedule's id, otherwise pass null
    scheduleId = selectedWeekObj ? selectedWeekObj.id : null;
  }

  // Check to see if a week was found (logic from above)
  if (scheduleId) {
    // if it was, go find that weeks actual schedule from state
    const scheduleFound = state.scheduleActual.find((el) => {
      return el.schedule_id === scheduleId;
    });

    // check to see if an actual schedule was found
    if (scheduleFound) {
      // if it was, find it and assign it to actualSchedule
      weekHasActualSchedule = true;
      actualSchedule = state.scheduleActual.filter((el) => {
        return el.schedule_id === scheduleId;
      });
    }

    // check if there are any needed employees (for any week)
    if (state.neededEmployees) {
      // find numner of needed employees for current week (filter + reduce)
      const countOfNeededEmployees = state.neededEmployees.filter((el) => {
        return el.schedule_id === scheduleId;
      }).reduce((acc, el) => {
        return acc + el.employees_needed;
      }, 0);
      // check if any employees are needed for current week
      if (countOfNeededEmployees > 0) {
        weekHasAtLeastOneNeededEmployee = true;
      }
    }
  }


  const schedules = {};
  const scheduleArr = [];

  // check if there is an actual schedule set for the week
  if (actualSchedule) {
    // loop over schedules for the week (each schedule is specific to a person's shift)
    actualSchedule.forEach((e) => {
      if (e.user_id === null) {
        // if user id is null, it is a house shift
        schedules['HOUSE'] = schedules['HOUSE'] || [];
        // push the shift identifier into array (specifies AM vs PM and day of week [1-14])
        schedules['HOUSE'].push(e.day_part_id);
      } else {
        // push the shift identifier into an array of the specific employee
        schedules[e.user_id] = schedules[e.user_id] || [];
        schedules[e.user_id].push(e.day_part_id);
      }
    });

    const keys = Object.keys(schedules);
    for (let i = 0; i < keys.length; i += 1) {
      const schedObj = {};
      if (keys[i] === 'HOUSE') {
        schedObj.name = 'HOUSE';
        schedObj.schedule = schedules[keys[i]];
      } else {
        schedObj.name = state.users.filter((user) => {
          // user.id is an integer and keys[i] is a string
          return user.id == keys[i];
        })[0].name;

        schedObj.schedule = schedules[keys[i]];
      }

      scheduleArr.push(schedObj);
    }
  }

  return {
    selectedWeek: state.selectedWeek,
    selectedWeekScheduleId: scheduleId,
    weekHasActualSchedule: weekHasActualSchedule,
    weekHasAtLeastOneNeededEmployee: weekHasAtLeastOneNeededEmployee,
    selectedWeekActualSchedule: scheduleArr,
  };
}

  Dashboard.propTypes = {
  selectedWeekScheduleId: PropTypes.number,
  weekHasActualSchedule: PropTypes.bool.isRequired,
  weekHasAtLeastOneNeededEmployee: PropTypes.bool.isRequired,
  selectedWeekActualSchedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedWeek: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Dashboard);
