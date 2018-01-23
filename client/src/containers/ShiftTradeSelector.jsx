import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { offerShift } from '../actions/index';

class ShiftTradeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: null,
    }
    this.handleOfferShift = this.handleOfferShift.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleOfferShift(event) {
    const { value } = event.target;
    event.preventDefault();
    if (event.target.value !== 'select-week') {
      this.setState({ offer: value });
    }
  }

  handleSave(event) {
    event.preventDefault();
    console.log(this.state.offer);
    if (this.state.offer) {
      this.props.offerShift(this.state.offer, this.props.user.id);
    }
  }

  renderOption(shift) {
    return (
      <option key={shift.id} value={shift.id}>
        Week of {shift.week.name}: {shift.name}
      </option>
    );
  }

  mapOptions(shifts) {
    return shifts.map((shift) => {
      return this.renderOption(shift);
    });
  }

  render() {
    return (
      <div className="ratio-col-1">
        <div className="employee-availability clear-fix">
          <h4>Offer a Shift Trade:</h4>
          <select
            className="date-dropdown"
            onChange={(event) => this.handleOfferShift(event)}
          > 
            <option key="default" value="select-week">
              Select Shift to Offer
            </option>
            {this.props.shifts && this.mapOptions(this.props.shifts)}
          </select>
          <div className="employee-availability clear-fix">
            <button 
              className="btn-main clickable"
              onClick={(event) => this.handleSave(event)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { users, scheduleActual, selectedWeek, scheduleDates } = state;

  const scheduleDateKey = {};

  scheduleDates.forEach((schedule) => {
    const { id, monday_dates } = schedule;
    scheduleDateKey[id] = monday_dates;
  });

  const shiftNames = {
    1: 'Monday AM',
    2: 'Monday PM',
    3: 'Tuesday AM',
    4: 'Tuesday PM',
    5: 'Wednesday AM',
    6: 'Wednesday PM',
    7: 'Thursday AM',
    8: 'Thursday PM',
    9: 'Friday AM',
    10: 'Friday PM',
    11: 'Saturday AM',
    12: 'Saturday PM',
    13: 'Sunday AM',
    14: 'Sunday PM',
  };

  const shifts = scheduleActual.map((shiftActual) => {
    const { day_part_id, schedule_id } = shiftActual;
    const shift = {};
    shift.id = shiftActual.id;
    shift.week = {
      id: schedule_id,
      name: scheduleDateKey[schedule_id],
    };
    shift.dayPartId = day_part_id;
    shift.name = shiftNames[day_part_id];
    return shift;
  });

  return {
    shifts,
    user: users[0],
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ offerShift }, dispatch);
}

ShiftTradeSelector.propTypes = {
  scheduleNeeds: PropTypes.object,
  offerShift: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShiftTradeSelector);
