import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteShift } from '../actions/index';

const EmployeeSchedule = (props) => {
  console.log('EMPLOYEE SCHEDULE PROPS', props);
  const shifts = [
    <div key="shiftblock" className="ratio-col-8 schedule-name">{props.schedule.name}
      <br />
      <span className="schedule-hours">{props.schedule.schedule.length * 6} hrs</span>
    </div>];

    // iterate over all possible days and make either an empty
    // div or a shift div (class determines color)
  for (let i = 1; i < 15; i += 1) {
    // check if the current shift is being worked
    if (props.schedule.schedule.indexOf(i) !== -1) {
      // if it is, add a 'shift-on' div
      shifts.push(<button
        key={`shift${props.schedule.name}${i}`}
        className="ratio-col-16 schedule-block schedule-shift-on"
        onClick={() => { props.deleteShift(); }}
      />);
    } else {
      // if it isn't, add a shift-off div
      shifts.push(<button
        key={`shift${props.schedule.name}${i}`}
        className="ratio-col-16 schedule-block schedule-shift-off"
        onClick={() => { props.deleteShift(); }}
        />);
    }
  }

  return (
    <div className="container schedule-row clear-fix">
      {shifts}
    </div>
  );
};

EmployeeSchedule.propTypes = {
  schedule: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteShift,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(EmployeeSchedule);
