import React from 'react';

class ShiftTradeItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list-item clear-fix clickable" onClick={() => console.log('click!')}>
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

export default ShiftTradeItem;
