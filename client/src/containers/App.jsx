import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllUsers } from '../actions/index';
import { getAllEmployeeAvailabilities } from '../actions/index';
import { getAllDayParts } from '../actions/index';
import { getAllNeededEmployees } from '../actions/index';
import { getAllScheduleDates } from '../actions/index';
import { changeView } from '../actions/index';

import EmployeeEditor from './EmployeeEditor.jsx';
import ScheduleEditor from './ScheduleEditor.jsx';
import ScheduleGenerator from './ScheduleGenerator.jsx';
import ScheduleActual from '../components/ScheduleActual.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

class App extends Component {

  componentWillMount() {
    this.props.getAllUsers();
    this.props.getAllEmployeeAvailabilities();
    this.props.getAllDayParts();
    this.props.getAllNeededEmployees();
    this.props.getAllScheduleDates();
  }

  renderView(){

    if (this.props.view === 'login') {
      return <Login />;
    } else if (this.props.view === 'signup') {
      return <SignUp />
    } else if (this.props.view === 'employeeEditor') {
      return <EmployeeEditor />;
    } else if (this.props.view === 'scheduleEditor') {
      return <ScheduleEditor />;
    } else {
      return <div></div>;
    }

  }

  render() {
    return (
      <div className="app-container clear-fix">
        <div className="ratio-col-4">
        <div className="component-block">
          <div className="editor-header">
            <div className="container clear-fix">
              <div className="ratio-col-2 editor-tab clickable" onClick={() => { this.props.changeView('employeeEditor')}}>Employees</div>
              <div className="ratio-col-2 editor-tab clickable" onClick={() => { this.props.changeView('scheduleEditor')}}>Schedule</div>
            </div>
          </div>
        {this.renderView()}
        </div>
      </div>
        <div className="ratio-col-4-3">
        <div className="component-block">
          <ScheduleGenerator />
          <ScheduleActual />
        </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { view: state.view, };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllUsers: getAllUsers,
    getAllEmployeeAvailabilities: getAllEmployeeAvailabilities,
    getAllDayParts: getAllDayParts,
    getAllNeededEmployees: getAllNeededEmployees,
    getAllScheduleDates: getAllScheduleDates,
    changeView: changeView,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
