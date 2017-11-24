import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeView, signUp } from '../actions/index';

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
          <input type="button" value="Sign Up" onClick={
            () => {
              let username = document.getElementById('username').value;
              let password = document.getElementById('password').value;
              props.signUp({ username, password });
              document.getElementById('username').value = '';
              document.getElementById('password').value = '';
            }
          } 
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent " />
        </div>
    </form>
    <p>
      <a onClick={() => { props.changeView('login')}}>Login</a>
    </p>
  </div>
);

function mapDispatchToProps(dispatch){
  return bindActionCreators({ changeView, signUp }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignUp);
