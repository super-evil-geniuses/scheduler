import React, { Component } from 'react';
import { connect } from 'react-redux';

import ScheduleAvailability from './ScheduleAvailability.jsx';

class ScheduleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monDate: new Date()
    }
  }
  render() {
    return (
      <div className='ratio-col-1'>
        <ScheduleAvailability dayPartsMap={this.props.dayPartsMap} monDate={this.state.monDate}/>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const dayPartsMap = {};
  if (state.dayParts) {
    state.dayParts.forEach((dayPart) => {
      dayPartsMap[dayPart.id] = dayPart.name;
    });
  }

  return {
    dayPartsMap: dayPartsMap,
  };
};

export default connect(mapStateToProps)(ScheduleEditor);
