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
  
  // getNextMondayDate = () => {
  //   let monday, today = new Date();
  //   if (today.getDay() === 1) {
  //     monday = moment().add(7, 'days');
  //   } else if (today.getDay() === 0) {
  //     monday = moment().add(1, 'days');
  //   } else {
  //     monday = moment().add(9 - today.getDay(), 'days');
  //   }
  //   return monday;
  // }
  // componentWillMount() {
  //   this.setState({mondayDate: this.getNextMondayDate()});
  // }

  renderButton() {
    if (this.props.weekHasActualSchedule) {
      return (
        <div className='schedule-generator-button'>
          <button className="btn-primary clickable" type="button" onClick={() => { this.props.generateSchedule(moment(this.props.selectedWeek)); }}>Regenerate</button>
        </div>
      );
    } else if (this.props.weekHasAtLeastOneNeededEmployee) {
      return (
        <div className='schedule-generator-button'>
          <button className="btn-primary" type="button" onClick={() => { this.props.generateSchedule(moment(this.props.selectedWeek)); }}>Generate</button>
        </div>
      );
    }
    return (
      <div className='schedule-generator-button'>
        <button className="btn-primary clickable" type="button">Please set shifts</button>
      </div>
    );
  }

  render() {
    return (
      <div className="schedule-generator clear-fix overlay">
        <div>
          <div>Week of <span className='schedule-generator-date'>{moment(this.props.selectedWeek).format("MMMM Do YYYY")}</span></div>
        </div>
        {this.renderButton()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ generateSchedule: generateSchedule }, dispatch)
}
export default connect(null, mapDispatchToProps)(ScheduleGenerator);


//Can only generate schedule if:

//selected week has actual_schedule
  //GEN: regenerate
  //CAL: schedule

  //selected week has some needed_saved
    //GEN: generate schedule
    //CAL: Generate a schedule for this week whn you have finalized your shifts.

//selected week has no needed_employees saved OR 0 needed employees saved
  //GEN: disabled
  //CAL: You haven't saved any shift requirements for this week.


