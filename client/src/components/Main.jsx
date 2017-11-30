import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import PersonalInformation from './PersonalInformation.jsx';

// The Main component renders one of the two provided
// Routes (provided that one matches). The /schedule
// route will match any pathname that starts
// with /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <div>
    <Switch>
      <Route exact path="/schedule" component={Dashboard} />
      <Route exact path="/personal/information" component={PersonalInformation} />
    </Switch>
  </div>
);

  // <Route exact path="/" component={Home} />
export default Main;
