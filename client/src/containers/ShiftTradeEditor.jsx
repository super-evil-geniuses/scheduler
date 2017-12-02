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
  const { userRole, trades } = state;
  return {
    userRole,
    trades,
  };
};

ShiftTradeEditor.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ShiftTradeEditor);
