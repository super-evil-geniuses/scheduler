import React from 'react';
import PropTypes from 'prop-types';

class ShiftTradeItem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      clickable: this.props.trade.requester.userId !== this.props.user.id,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { scheduleId } = this.props.trade.scheduleInfo;
    const { userId } = this.props.user.id;
    const { id } = this.props.trade;

    if (this.state.clickable) {
      this.props.acceptTrade(scheduleId, userId, id);
    }
  }

  render() {
    return (
      <div className="list-item clear-fix clickable" onClick={this.handleClick}>
        <div className="ratio-col-4-3" >
          <div>
            <span>{this.props.trade.scheduleInfo.weekOf}: {this.props.trade.scheduleInfo.shift}</span>
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
}

ShiftTradeItem.propTypes = {
  user: PropTypes.object.isRequired,
  trade: PropTypes.object.isRequired,
  acceptTrade: PropTypes.func.isRequired,
};

export default ShiftTradeItem;
