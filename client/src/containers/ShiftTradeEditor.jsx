import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ShiftTradeItem from '../components/ShiftTradeItem.jsx';

class ShiftTradeEditor extends Component {
  constructor(props) {
    super(props);
  }

  renderShift(trade) {
    return (
      <div className="list-item clear-fix clickable" onClick={() => console.log('click!')}>
        <div className="ratio-col-4-3" >
          <div>
            <span>{trade.scheduleInfo.weekOf}: {trade.scheduleInfo.shift}</span>
          </div>
        </div>
        <div className="ratio-col-4" >
          <div className="employee-edit">
            <i className="material-icons employee-edit-button">date_range</i>
          </div>
        </div>
      </div>
    );
  }

  renderHeader() {
    return (
      <div className="list-item clear-fix">
        <div className="ratio-col-4-3" >
          <div className="employee-edit">
            <h4>Requested Shift Trades:</h4>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="ratio-col-1">
        <div className="container schedule-row clear-fix">
          {this.renderHeader()}
          <ShiftTradeItem trade={this.props.trades[0]} />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { userRole, trades, allSchedules, scheduleDates, dayParts, users } = state;

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
    users,
  };
};

ShiftTradeEditor.propTypes = {
  userRole: PropTypes.string.isRequired,
  trades: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(ShiftTradeEditor);
