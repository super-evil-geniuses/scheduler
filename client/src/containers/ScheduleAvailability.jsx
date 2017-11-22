import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateScheduleAvailability } from '../actions/index';
import _ from 'underscore';

class ScheduleAvailability extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSchedule: {},
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
              onClick={() => this.props.updateScheduleAvailability(this.props.schedule, this.state.newSchedule)}
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
            <input type="text" placeholder="Date (e.g. 11/13/17)"></input>
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
    }
    return (
      <div className="employee-availability clear-fix">
        {renderBody}
      </div>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateScheduleAvailability: updateScheduleAvailability}, dispatch);
}

export default connect(null, mapDispatchToProps)(ScheduleAvailability);
