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
      currentView: 'employeeEditor',
    };
  }

  renderTab(title, viewType) {
    const selectedStyle = 'ratio-col-2 editor-tab selected-tab';
    const clickableStyle = 'ratio-col-2 editor-tab clickable'

    return (
      <div
        className={this.state.currentView === viewType ? selectedStyle : clickableStyle}
        onClick={() => { 
          this.setState({ currentView: viewType });
        }}
      >
        {title}
      </div>
    );
  }

  renderManagerHeader() {
    return (
      <div className="container clear-fix">
        {this.renderTab('Employees', 'employeeEditor')}
        {this.renderTab('Schedules', 'scheduleEditor')}
      </div>
    );
  }

  renderEmployeeHeader() {
    return (
      <div className="container clear-fix">
        {this.renderTab('Employees', 'employeeEditor')}
      </div>
    );
  }

  renderScheduleActual() {
    return (            
      <ScheduleActual
        selectedWeek={this.props.selectedWeek}
        weekHasActualSchedule={this.props.weekHasActualSchedule}
        weekHasAtLeastOneNeededEmployee={this.props.weekHasAtLeastOneNeededEmployee}
        selectedWeekActualSchedule={this.props.selectedWeekActualSchedule}
      />
    );
  }

  renderManagerMain() {
    return (
      <div className="component-block">
        <ScheduleGenerator
          selectedWeek={this.props.selectedWeek}
          weekHasActualSchedule={this.props.weekHasActualSchedule}
          weekHasAtLeastOneNeededEmployee={this.props.weekHasAtLeastOneNeededEmployee}
        />
        {this.renderScheduleActual()}
      </div>
    );
  }

  renderEmployeeMain() {
    return (
      <div className="component-block">
        {this.renderScheduleActual()}
      </div>
    );
  }

  renderEmployeeEditor() {
    return <div>Employee's View</div>;
  }

  renderManagerEditor() {
    let editorView = <EmployeeEditor />;

    if (this.state.currentView === 'scheduleEditor') {
      editorView = <ScheduleEditor />;
    } 
    return editorView;
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="ratio-col-4 major-component">
          <div className="component-block">
            <div className="editor-header">
              {this.props.userRole === 'manager' ? this.renderManagerHeader() : this.renderEmployeeHeader()}
            </div>
            {this.props.userRole === 'manager' ? this.renderManagerEditor() : this.renderEmployeeHeader()}
          </div>
        </div>
        <div className="ratio-col-4-3 major-component">
          {this.props.userRole === 'manager' ? this.renderManagerMain() : this.renderEmployeeMain()}
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
  
  if (state.scheduleDates) {
    const selectedWeekObj = state.scheduleDates.find((el) => {
        return el.monday_dates.toString().substr(0, 10) === state.selectedWeek;
      });
      scheduleId = selectedWeekObj ? selectedWeekObj.id : null;
  }

  if (scheduleId) {
    const scheduleFound = state.scheduleActual.find((el) => {
      return el.schedule_id === scheduleId
    });
    if (scheduleFound) {
      weekHasActualSchedule = true;
      actualSchedule = state.scheduleActual.filter((el) => {
        return el.schedule_id === scheduleId;
      });
    }
    if(state.neededEmployees) {
      const countOfNeededEmployees = state.neededEmployees.filter((el) => {
        return el.schedule_id === scheduleId;
      }).reduce((acc, el) => {
        return acc + el.employees_needed;
      }, 0);
      if (countOfNeededEmployees > 0) {
        weekHasAtLeastOneNeededEmployee = true;
      }
    }
  }


  const schedules = {};
  const scheduleArr = [];
  if (actualSchedule) {
    actualSchedule.forEach((e) => {
      if (e.user_id === null) {
        schedules['HOUSE'] = schedules['HOUSE'] || [];
        schedules['HOUSE'].push(e.day_part_id);
      } else {
        schedules[e.user_id] = schedules[e.user_id] || [];
        schedules[e.user_id].push(e.day_part_id);
      }
    });
       
    for (let sched in schedules) {
      const schedObj = {};
      if (sched === 'HOUSE') {
        schedObj.name = 'HOUSE';
        schedObj.schedule = schedules[sched];
      } else {
        schedObj.name = state.users.filter( (user) => {
          return user.id == sched;
        })[0].name;

        schedObj.schedule = schedules[sched];
      }

      scheduleArr.push(schedObj);
    }
  }

  return {
    userRole: state.userRole,
    selectedWeek: state.selectedWeek,
    selectedWeekScheduleId: scheduleId,
    weekHasActualSchedule: weekHasActualSchedule,
    weekHasAtLeastOneNeededEmployee: weekHasAtLeastOneNeededEmployee,
    selectedWeekActualSchedule: scheduleArr,
  };
}

  Dashboard.propTypes = {
  userRole: PropTypes.string.isRequired,
  selectedWeekScheduleId: PropTypes.number,
  weekHasActualSchedule: PropTypes.bool.isRequired,
  weekHasAtLeastOneNeededEmployee: PropTypes.bool.isRequired,
  selectedWeekActualSchedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedWeek: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Dashboard);
