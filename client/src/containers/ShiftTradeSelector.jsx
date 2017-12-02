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
  const { scheduleActual } = state;

  return {
    scheduleActual,
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
