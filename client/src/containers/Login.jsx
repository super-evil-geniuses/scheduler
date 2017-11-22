import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeView, login } from '../actions/index';

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
          <input type="button" value="Login" onClick={
            () => {
              let username = document.getElementById('username').value;
              let password = document.getElementById('password').value;
              props.login({ username, password })
            }
          } />
        </div>
    </form>
    <p>
      <a onClick={() => { props.changeView('signup')}}>Create an Account &rarr;</a>
    </p>
  </div>
);

function mapDispatchToProps(dispatch){
  return bindActionCreators({ changeView, login }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);
