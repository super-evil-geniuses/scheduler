import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllUsers } from '../actions/index';
import { getAllEmployeeAvailabilities } from '../actions/index';
import { getAllDayParts } from '../actions/index';

import EmployeeEditor from './EmployeeEditor.jsx';

class App extends Component {

  componentWillMount() {
    this.props.getAllUsers();
    this.props.getAllEmployeeAvailabilities();
    this.props.getAllDayParts();
  }

  render() {
    return (
      <div className="container clear-fix">
        <div className="ratio-col-4">
        <div className="editor-header">
          <div className="container clear-fix">
            <div className="ratio-col-2 editor-tab">Employees</div>
            <div className="ratio-col-2 editor-tab">Schedule</div>
          </div>
        </div>
          <EmployeeEditor />
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
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
