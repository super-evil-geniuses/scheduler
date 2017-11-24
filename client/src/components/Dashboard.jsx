import React, { Component } from 'react';
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
        <div className="ratio-col-4">
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

export default Dashboard;