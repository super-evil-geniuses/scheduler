import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


import EmployeeEditor from '../containers/EmployeeEditor.jsx';
import ScheduleEditor from '../containers/ScheduleEditor.jsx';
import ScheduleGenerator from '../containers/ScheduleGenerator.jsx';
import ScheduleActual from './ScheduleActual.jsx';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'scheduleEditor'
    }
  }
  
  render() {
    let editorView;
    if(this.state.currentView === 'employeeEditor') {
      editorView = <EmployeeEditor />
    } else {
      editorView = <ScheduleEditor />
    }

    return (
      <div className="dashboard-container">
        <div className="ratio-col-4 major-component">
          <div className="component-block">
            <div className="editor-header">
              <div className="container clear-fix">
                <div className="ratio-col-2 editor-tab clickable" onClick={() => { this.setState({currentView: 'employeeEditor' })}}>Employees</div>
                <div className="ratio-col-2 editor-tab clickable" onClick={() => { this.setState({currentView: 'scheduleEditor' })}}>Schedule</div>
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
            weekHasAtLeastOneNeededEmployee={this.props.weekHasAtLeastOneNeededEmployee}/>
            <ScheduleActual
            selectedWeek={this.props.selectedWeek}
            weekHasActualSchedule={this.props.weekHasActualSchedule}
            weekHasAtLeastOneNeededEmployee={this.props.weekHasAtLeastOneNeededEmployee}/>
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

  const selectedWeekObj = state.scheduleDates.find((el) => {
    return moment(el.monday_dates).format('MMMM Do YYYY') === moment(state.selectedWeek).format('MMMM Do YYYY');
  });
  scheduleId = selectedWeekObj ? selectedWeekObj.id : null;
  
  if(scheduleId) {
    const scheduleFound = state.scheduleActual.find((el) => {
      return el.schedule_id === scheduleId
    })
    if(scheduleFound) {
      weekHasActualSchedule = true;
    }
    const countOfNeededEmployees = state.neededEmployees.filter((el)=> {
      return el.schedule_id === scheduleId;
    }).reduce((acc, el) => {
      return acc + el.employees_needed
    }, 0);
    if(countOfNeededEmployees > 0) {
      weekHasAtLeastOneNeededEmployee = true;
    }
  }

  return {
    selectedWeek: state.selectedWeek,
    // scheduleId: scheduleId,
    weekHasActualSchedule: weekHasActualSchedule,
    weekHasAtLeastOneNeededEmployee: weekHasAtLeastOneNeededEmployee
  }
}

export default connect(mapStateToProps)(Dashboard);
