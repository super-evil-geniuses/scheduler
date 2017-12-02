import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ShiftTradeEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='ratio-col-1'>
        Shift Trade Component
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { userRole } = state;
  return {
    userRole,
  };
};

ShiftTradeEditor.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ShiftTradeEditor);
