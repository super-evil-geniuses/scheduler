import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectWeek } from '../actions/index';

class WeekSelector extends Component {
  constructor(props) {
    super(props);
    this.handleSelectWeek = this.handleSelectWeek.bind(this);
  }

  handleSelectWeek(event) {
    event.preventDefault();
    console.log(event.target.value);
    // this.props.selectWeek(event.target.value);
  }

  render() {
    return (
      <div>
        Week Selector
        <select
          className="date-dropdown"
          onChange={event => this.handleSelectWeek(event)}
        >
          {Object.keys(this.props.scheduleNeeds).map((id) => {
            const monDate = this.props.scheduleNeeds[id].monDate.substr(0, 10);
            const optionVal = JSON.stringify([id, monDate]);
            return (
              <option
                key={optionVal}
                value={optionVal}
                defaultValue={optionVal.includes(this.props.selectedWeek)}
              >
                {monDate}
              </option>
            );
          })}
          </select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const scheduleNeeds = state.scheduleDates.reduce((acc, scheduleDate) => {
    acc[scheduleDate.id] = {
      id: scheduleDate.id,
      monDate: scheduleDate.monday_dates,
      neededEmployees: {},
    };
    return acc;
  }, {});

  state.neededEmployees.forEach((requirement) => {
    scheduleNeeds[requirement.schedule_id].neededEmployees[requirement.day_part_id] = requirement.employees_needed;
  });

  return {
    scheduleNeeds,
    selectedWeek: state.selectedWeek,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectWeek }, dispatch);
}

WeekSelector.propTypes = {
  scheduleNeeds: PropTypes.string.isRequired,
  selectSchedule: PropTypes.func.isRequired,
  selectedWeek: PropTypes.PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeekSelector);