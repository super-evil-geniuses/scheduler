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
    this.props.selectWeek(event.target.value);
  }

  render() {
    return (
      <div className='ratio-col-1'>
        <div className="employee-availability clear-fix">
          <h4>Select Week to View Your Schedule:</h4>
          <select
            className="date-dropdown"
            onChange={event => this.handleSelectWeek(event)}
          >
            {this.props.scheduleNeeds && Object.keys(this.props.scheduleNeeds).map((id) => {
              const monDate = this.props.scheduleNeeds[id].monDate.substr(0, 10);
              const optionVal = monDate;
              return (
                <option
                  key={optionVal}
                  value={optionVal}
                  selected={optionVal.includes(this.props.selectedWeek)}
                >
                  {monDate}
                </option>
              );
            })}
            </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let scheduleNeeds;
  if (state.scheduleDates) {
    scheduleNeeds = state.scheduleDates.reduce((acc, scheduleDate) => {
      acc[scheduleDate.id] = {
        id: scheduleDate.id,
        monDate: scheduleDate.monday_dates,
        neededEmployees: {},
      };
      return acc;
    }, {});
  }

  return {
    scheduleNeeds,
    selectedWeek: state.selectedWeek,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectWeek }, dispatch);
}

WeekSelector.propTypes = {
  scheduleNeeds: PropTypes.object,
  selectWeek: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeekSelector);
