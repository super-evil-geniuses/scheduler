import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { offerShift } from '../actions/index';

class ShiftTradeSelector extends Component {
  constructor(props) {
    super(props);
    this.handleOfferShift = this.handleOfferShift.bind(this);
  }

  handleOfferShift(event) {
    event.preventDefault();
    if (event.target.value !== 'select-week') {
      this.props.OfferShift(event.target.value);
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className='ratio-col-1'>
        <div className="employee-availability clear-fix">
          <h4>Offer a Shift Trade:</h4>
          <select
            className="date-dropdown"
            onChange={event => this.handleOfferShift(event)}
          > 
            <option key="default" value="select-week">
              Select Shift to Offer
            </option>
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { scheduleActual, selectedWeek, scheduleDates } = state;

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
      name: scheduleDates[schedule_id],
    };
    shift.dayPartId = day_part_id;
    shift.name = shiftNames[day_part_id];
    return shift;
  });

  return {
    // scheduleActual,
    shifts,
    // selectedWeek,
    // scheduleDates,
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
