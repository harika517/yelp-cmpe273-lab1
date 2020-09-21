import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import cookie from 'react-cookies';
// import { Redirect } from 'react-router';

//create the Navbar Component
export const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          yelp <i className="fab fa-yelp"></i>
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/">
            <i className="fas fa-home" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/signup">SignUP</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
