import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllUsers } from '../actions/index';
import { getAllEmployeeAvailabilities } from '../actions/index';
import { getAllDayParts } from '../actions/index';
import { getAllNeededEmployees } from '../actions/index';
import { getAllScheduleDates } from '../actions/index';

import EmployeeEditor from './EmployeeEditor.jsx';
import ScheduleEditor from './ScheduleEditor.jsx';
import ScheduleGenerator from './ScheduleGenerator.jsx';


class App extends Component {

  componentWillMount() {
    this.props.getAllUsers();
    this.props.getAllEmployeeAvailabilities();
    this.props.getAllDayParts();
    this.props.getAllNeededEmployees();
    this.props.getAllScheduleDates();
  }

  render() {
    return (
      <div className="app-container clear-fix">
        <div className="ratio-col-4">
        <div className="editor-header">
          <div className="container clear-fix">
            <div className="ratio-col-2 editor-tab clickable">Employees</div>
            <div className="ratio-col-2 editor-tab clickable">Schedule</div>
          </div>
        </div>
          <ScheduleEditor />
          <EmployeeEditor />
          <ScheduleGenerator />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllUsers: getAllUsers,
    getAllEmployeeAvailabilities: getAllEmployeeAvailabilities,
    getAllDayParts: getAllDayParts,
    getAllNeededEmployees: getAllNeededEmployees,
    getAllScheduleDates: getAllScheduleDates,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
