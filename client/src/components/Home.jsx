import React from 'react';
import Dashboard from './Dashboard.jsx';

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
        {
          this.state.showsDashboard ? <Dashboard /> :
          <div>
            <button onClick={this.showDashboard}>Dashboard</button>
            <button>Personal Information</button>
          </div>
        }
      </div>
    );
  }
}

export default Home;
