import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Login = (props) => (
  <div className="employee-availability clear-fix">
    <h4>Login</h4>
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
          <input type="submit" value="Login" />
        </div>
    </form>
    <p>
      <a href="">Create an Account &rarr;</a>
    </p>
  </div>
);

function mapDispatchToProps(dispatch){
  return bindActionCreators({}, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);
