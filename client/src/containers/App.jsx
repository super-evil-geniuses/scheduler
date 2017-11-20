import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { selectEmployee } from '../actions/index';
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
      <div>
        Here is the app!
        <EmployeeEditor />
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
