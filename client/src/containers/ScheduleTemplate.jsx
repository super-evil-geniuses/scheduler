import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateNeededEmployees } from '../actions/index';
import { createScheduleTemplate } from '../actions/index';
import { createScheduleDate } from '../actions/index';
import _ from 'underscore';
import moment from 'moment';

class ScheduleTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSchedule: {},
      newDate: null
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.schedule != this.props.schedule) {
      const newSchedule = _.clone(nextProps.schedule.neededEmployees);
      this.setState({
        newSchedule: newSchedule,
      })
    }
  }

  alterDay = (e, dayPart) => {   
    let schedule = this.state.newSchedule;
    schedule[dayPart] = e.target.value ? parseInt(e.target.value) : e.target.value;
    this.setState({
      newSchedule: schedule
    })
  }

  mapDayPartsAsInputs = (dayPart, idx) => {
    return (
      <td
      key={`${this.props.monDate}${dayPart}`}>
        <input onChange={(e) => this.alterDay(e, dayPart)} name={dayPart} className="schedule-input-box" type="text" value={this.state.newSchedule[dayPart]}/>
      </td>
    );
  }

  getNextMondayDates () {
    let monday = [];
    for (let i = 1; i < 6; i++) {
      let mondayDates = moment().day(1 + i*7).format("M/D/YY");
      // if schedule doesn't already exist
      if (!this.dateExists(mondayDates)) {
        monday.push(mondayDates.substr(0,10));
      }
    }
    return monday;
  }

  selectDate(date) {
    this.setState({
      newDate: date
    });
  }

  dateExists(date) {
    let dateExists = false;
    let date1 = date.split('/');
    Object.keys(this.props.scheduleNeeds).forEach(id => {
      let date2 = this.props.scheduleNeeds[id].monDate.substr(0,10).split('-');
      if (date2[0].substr(2,2) === date1[2] && parseInt(date2[1]) === parseInt(date1[0]) && parseInt(date2[2]) === parseInt(date1[1])) {
        dateExists = true;
      }
    });
    return dateExists;
  }

  render() {
    let renderBody;
    if(!this.props.schedule) {
      renderBody = (
        <h4>Please select a schedule</h4>
      );
    } else {

      let morningParts = Object.keys(this.state.newSchedule).filter((dayPart) => {
        return dayPart % 2 !== 0;
      }).map(this.mapDayPartsAsInputs);

      let afternoonParts = Object.keys(this.state.newSchedule).filter((dayPart) => {
        return dayPart % 2 === 0;
      }).map(this.mapDayPartsAsInputs);

      if (this.props.schedule.id) {
        renderBody = (
          <div>
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
              onClick={() => this.props.updateNeededEmployees(this.props.schedule, this.state.newSchedule)}
              >
                Save
              </button>
            </div>
          </div>
        );
      } else {
        renderBody = (
          <div>
            <h4>Create schedule</h4>
            <select onChange={(e) => { this.selectDate(e.target.value) }}>
              <option defaultValue='' disabled selected>Select a date...</option>
                {this.getNextMondayDates().map(monDate => {
                  return <option value={monDate}>{monDate}</option>
                })}
            </select>
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
              onClick={() => {this.props.createScheduleTemplate(this.state.newDate, this.state.newSchedule)} }
              >
                Save
              </button>
            </div>
          </div>
        );   
      }
    }
    return (
      <div className="employee-availability clear-fix">
        {renderBody}
      </div>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateNeededEmployees: updateNeededEmployees,
    createScheduleDate: createScheduleDate,
    createScheduleTemplate: createScheduleTemplate,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(ScheduleTemplate);
