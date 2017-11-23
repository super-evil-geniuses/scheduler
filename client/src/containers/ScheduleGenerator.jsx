import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateSchedule } from '../actions/index';
import _ from 'underscore';
import moment from 'moment';

class ScheduleGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mondayDate: null,
    }
  }
  
  getNextMondayDate = () => {
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
      <div className="schedule-generator clear-fix overlay">
        <div>
          <div>Week of <span className='schedule-generator-date'>{this.state.mondayDate.format("MMMM Do YYYY")}</span></div>
        </div>
        <div className='schedule-generator-button'>
          <button className="btn-primary clickable" type="button" onClick={() => { this.props.generateSchedule(/*this.state.mondayDate.calendar() commented out for testing purposes*/'11/13/17');}}>Generate</button>
        </div>
      </div>
      )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ generateSchedule: generateSchedule }, dispatch)
}
export default connect(null, mapDispatchToProps)(ScheduleGenerator);