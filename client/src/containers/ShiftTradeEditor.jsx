import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ShiftTradeEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.trades);
    return (
      <div className='ratio-col-1'>
        Shift Trade Component
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { userRole, trades, scheduleActual, scheduleDates, dayParts } = state;

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
  }

  const formattedTrades = trades.map((trade) => {
    const actualSchedule = scheduleActual.filter((schedule) => {
      return schedule.id === trade.actual_schedule_id;
    });
    const scheduleDate = scheduleDates.filter((scheduleDate) => {
      return scheduleDate.id === actualSchedule.schedule_id;
    });
    const dayPart = dayParts.filter((dayPart) => {
      return dayPart.id === actualSchedule.day_part_id;
    })

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
  };
};

ShiftTradeEditor.propTypes = {
  userRole: PropTypes.string.isRequired,
  trades: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(ShiftTradeEditor);
