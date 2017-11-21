import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { updateScheduleAvailability } from '../actions/index';
import _ from 'underscore';

class ScheduleAvailability extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSchedule: {},
      test: 'thisss',
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.monDate != this.props.monDate) {
      //get next date schedule and set as state
      const dayPartsMap = _.clone(nextProps.dayPartsMap);
      this.setState({
        newSchedule: dayPartsMap,
      })
    }
  }

  alterDay = (dayPart) => {    
    let schedule = this.state.newSchedule;
    schedule[dayPart] = 10;
    this.setState({
      newSchedule: schedule
    })
  }

  mapDayPartsAsInputs = (dayPart, idx) => {
    return (
      <td
      // key={`${this.props.employee.name}${dayPart}`}
      onClick={(e) => this.alterDay(dayPart)}>
        <input className="schedule-input-box" type="text" />
      </td>
    );
  }

  render() {

    let morningParts = Object.keys(this.props.dayPartsMap).filter((dayPart) => {
      return dayPart % 2 !== 0;
    }).map(this.mapDayPartsAsInputs);

    let afternoonParts = Object.keys(this.props.dayPartsMap).filter((dayPart) => {
      return dayPart % 2 === 0;
    }).map(this.mapDayPartsAsInputs);

    return (
      <div className="employee-availability clear-fix">
        <h4>Edit schedule</h4>
        <p>How many employees do you need for each shift?</p>
        <table className="select-days-table">
          <tbody>
            <tr>
              <th scope="row"></th>
              <th scope="col">Mon</th>
              <th scope="col">Tue</th>
              <th scope="col">Wed</th>
              <th scope="col">Thu</th>
              <th scope="col">Fri</th>
              <th scope="col">Sat</th>
              <th scope="col">Sun</th>
            </tr>
            <tr>
              <th scope="row">AM</th>
              {morningParts}  
            </tr>
            <tr>
              <th scope="row">PM</th>
              {afternoonParts}
            </tr>
          </tbody>
        </table>
        <div className="employee-editor-save-btn">
          <button 
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent "
          //onClick={() => this.props.updateEmployeeAvailability(this.props.employee, this.state.newAvailabilities)}
          >
            Save
          </button>
        </div>
      </div>
    ); 
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(null, mapDispatchToProps)(ScheduleAvailability);
