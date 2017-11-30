import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';

const Home = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Main />
    </div>
  </BrowserRouter>
);

export default Home;
