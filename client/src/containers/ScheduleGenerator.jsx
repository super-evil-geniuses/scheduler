import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEmployeeAvailability } from '../actions/index';
import _ from 'underscore';
import moment from 'moment';

class ScheduleGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mondayDate: null,
    }
  }
  getNextMondayDate () {
    let monday, today = new Date();
    if (today.getDay() === 1) {
      monday = moment().add(7, 'days');
    } else if (today.getDay() === 0) {
      monday = moment().add(1, 'days');
    } else {
      monday = moment().add(9 - today.getDay(), 'days');
    }
    return monday;
  }
  componentWillMount(){
    this.setState({mondayDate: this.getNextMondayDate()});
  }
  render() {
    return (
      <div>
      <br></br>
        This is the schedule Generator
        <div>
          <div>{this.state.mondayDate.calendar()}</div>
        </div>
        <div>
          <button type="button" onClick={() => { console.log('lets get generated');}}>Generate Schedule</button>
        </div>
      </div>
      )
  }
}

export default ScheduleGenerator;