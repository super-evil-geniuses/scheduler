import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import Header from './Header.jsx';
import Main from './Main.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.showDashboard = this.showDashboard.bind(this);

    this.state = {
      showsDashboard: false,
    };
  }

  showDashboard() {
    this.setState({
      showsDashboard: true,
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default Home;
