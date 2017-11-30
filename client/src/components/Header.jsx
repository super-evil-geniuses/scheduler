import React from 'react';
import { Link } from 'react-router-dom';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <div>
    <button>
      <Link to="/">Home</Link>
    </button>
    <button>
      <Link to="/schedule">Schedule</Link>
      </button>
    <button>
      <Link to="/personal/information">Personal Information</Link>
    </button>
  </div>
);

export default Header;
