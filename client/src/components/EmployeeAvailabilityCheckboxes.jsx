import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEmployeeAvailability } from '../actions/index';
import _ from 'underscore';

class EmployeeAvailabilityCheckboxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newAvailabilities: {}
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.employee != this.props.employee) {
      const newAvailabilities = _.clone(nextProps.employee.availabilities);
      this.setState({
        newAvailabilities: newAvailabilities,
      })
    }
  }

  componentDidMount = () => {
    const newAvailabilities = _.clone(this.props.employee.availabilities);
    this.setState({
      newAvailabilities: newAvailabilities,
    })
  }

  handleChange = (e) => {
    debugger;
    let availabilities = this.state.newAvailabilities;
    availabilities[e.target.name] = e.target.checked
    this.setState({
      newAvailabilities: availabilities
    })
  }

  render() {
    let dayParts = Object.keys(this.state.newAvailabilities).map((dayPart, idx) => {
      return (
        <div key={`${this.props.employee.name}${idx}`}>
          <input 
            onClick={(e) => this.handleChange(e)}
            type="checkbox"
            id={idx}
            name={dayPart}
            value={this.state.newAvailabilities[dayPart]}
            defaultChecked={this.state.newAvailabilities[dayPart]}
          />
          <label htmlFor={idx}>{dayPart} </label>
        </div>
      );
    });

    return (
      <div>
        <h4>{this.props.employee.name}</h4>
        {dayParts}
        <button onClick={() => this.props.updateEmployeeAvailability(this.props.employee, this.state.newAvailabilities)}>SAVE</button>
      </div>
    ); 
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateEmployeeAvailability: updateEmployeeAvailability}, dispatch);
}

export default connect(null, mapDispatchToProps)(EmployeeAvailabilityCheckboxes);
