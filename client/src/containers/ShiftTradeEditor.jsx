import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { acceptTrade } from '../actions/index';

import ShiftTradeItem from '../components/ShiftTradeItem.jsx';

class ShiftTradeEditor extends Component {
  constructor(props) {
    super(props);
    this.acceptTrade = this.props.acceptTrade.bind(this);
  }

  renderItems() {
    const user = this.props.users[0];

    if (this.props.trades.length > 0) {
      return (
        this.props.trades.map((trade) => {
          return (
            <ShiftTradeItem key={trade.id} trade={trade} user={user} acceptTrade={this.acceptTrade} />
          );
        })
      );
    }
    return (
      <div className="list-item clear-fix clickable">
        <div className="ratio-col-4-3" >
          <div>
            <span>No Shifts Currently Offered</span>
          </div>
        </div>
        <div className="ratio-col-4" >
          <div className="employee-edit">
            <i className="material-icons employee-no-edit-button" >
              date_range
            </i>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="ratio-col-1">
        <div className="container schedule-row clear-fix">
          <div className="list-item clear-fix">
            <div className="ratio-col-4-3" >
              <div className="employee-edit">
                <h4>Requested Shift Trades:</h4>
              </div>
            </div>
          </div>
          {this.renderItems()}
        </div>
      </div>
    );
  }
}

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
    satP: 'Saturday PM',
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
      userId: trade.user_id,
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
  users: PropTypes.arrayOf(PropTypes.object),
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ acceptTrade }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftTradeEditor);
