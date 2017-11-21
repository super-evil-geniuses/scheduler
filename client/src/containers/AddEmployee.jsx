import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { selectEmployee } from '../actions/index';

// owner adds an employee by name. upon save, creates a user in the user table w/ pw null, role is employee, and then employee availability with all values set to false

// local react state: newly added employee info

class AddEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmployeeName: '',
    }
    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(event) {
  //   console.log('newEmployeeName: ', this.state.newEmployeeName)
  //   this.setState({newEmployeeName: event.target.value});
  // }

          // <label>
          //   Username:
          // </label>
            // <input type="text" name="name" onChange={this.handleChange} />
          // <button onClick={() => this.props.addEmployee(this.props.employee, this.state.newEmployeeName)}> Add </button>
  render() {
    return (
      <div className="list-item clear-fix clickable">
        hi div goes here
        
      </div>
    );
  }
};

// function mapDispatchToProps(dispatch) {
//   return {};
//   // bindActionCreators({addEmployee: addEmployee}, dispatch);
// }
export default AddEmployee;
// export default connect(null, mapDispatchToProps)(AddEmployee);
