import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Dashboard from './Dashboard.jsx';
import Header from './Header.jsx';

// The Main component renders one of the two provided
// Routes (provided that one matches). The /schedule
// route will match any pathname that starts
// with /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/schedule" component={Dashboard} />
    </Switch>
  </main>
);

  // <Route exact path="/" component={Home} />
export default Main;
