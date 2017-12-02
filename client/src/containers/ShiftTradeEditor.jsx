import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ShiftTradeEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.trades);
    console.log(this.props.allSchedules);
    return (
      <div className='ratio-col-1'>
        Shift Trade Component
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { userRole, trades, allSchedules, scheduleDates, dayParts } = state;

  const shiftNames = {
    monA: 'Monday AM',
    monP: 'Monday PM',
    tuesA: 'Tuesday AM',
    tuesP: 'Tuesday PM',
    wedsA: 'Wednesday AM',
    wedsP: 'Wednesday PM',
    thursA: 'Thursday AM',
    thursP: 'Thursday PM',
    friA: 'Friday AM',
    friP: 'Friday PM',
    satA: 'Saturday AM',
    sunA: 'Sunday AM',
    sunP: 'Sunday PM',
  };

  const formattedTrades = trades.map((trade) => {
    const actualSchedule = allSchedules.filter((schedule) => {
      return schedule.id === trade.actual_schedule_id;
    })[0];
    const scheduleDate = scheduleDates.filter((scheduleDate) => {
      return scheduleDate.id === actualSchedule.schedule_id;
    })[0];
    const dayPart = dayParts.filter((dayPart) => {
      return dayPart.id === actualSchedule.day_part_id;
    })[0];

    const formattedTrade = {};
    formattedTrade.id = trade.id;
    formattedTrade.status = trade.status;
    formattedTrade.requester = {
      userId: trade.id,
      name: trade.name,
    };
    formattedTrade.scheduleInfo = {
      scheduleId: actualSchedule.id,
      weekOf: scheduleDate.monday_dates,
      shift: shiftNames[dayPart.name],
    };

    return formattedTrade;
  })

  return {
    userRole,
    trades: formattedTrades,
    allSchedules,
  };
};

ShiftTradeEditor.propTypes = {
  userRole: PropTypes.string.isRequired,
  trades: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(ShiftTradeEditor);
