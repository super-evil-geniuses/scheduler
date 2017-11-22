import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const SignUp = (props) => (
  <div className="employee-availability clear-fix">
    <h4>Sign Up</h4>
    <form >
        <div>
          <label>Username:</label>
          <input id="username" type="text" name="username" />
        </div>
        <div>
          <label>Password:</label>
          <input id="password" type="password" name="password" />
        </div>
        <div>
          <input type="submit" value="SignUp" />
        </div>
    </form>
    <p>
      <a href="">Login</a>
    </p>
  </div>
);

function mapDispatchToProps(dispatch){
  return bindActionCreators({}, dispatch);
}

export default connect(null, mapDispatchToProps)(SignUp);
