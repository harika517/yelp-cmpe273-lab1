import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

// import cookie from 'react-cookies';
// import { Redirect } from 'react-router';

//create the Navbar Component
export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    // <div className="navBar">
    <ul>
      {/* <li>
        <a href="/review" className="btn btn-dark my-1">
          <span className="hide-sm">Write a Review</span>
        </a>
      </li> */}
      {/* <li>
        <a href="/events" className="btn btn-dark my-1">
          <span className="hide-sm">Events</span>
        </a>
      </li> */}
      <li>
        <a onClick={logout} href="/" className="btn btn-dark my-1">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
    // </div>
  );

  const guestLinks = (
    <ul>
      {/* <li>
        <img class="logo-icon" src={'/images/logo.png'}></img>
      </li> */}
      <li>
        <Link to="/" className="btn btn-dark my-1">
          <i className="fas fa-home" />
          Home
        </Link>
      </li>
      <li>
        <Link to="/restaurants" className="btn btn-dark my-1">
          Restaurant Login
        </Link>
      </li>
      <li>
        <Link to="/signup" className="btn btn-dark my-1">
          SignUP
        </Link>
      </li>
      <li>
        <Link to="/login" className="btn btn-primary my-1">
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <div className="navBar">
        <img
          className="logo-icon"
          src="https://s3-media4.fl.yelpcdn.com/assets/srv0/yelp_styleguide/c3484759c57a/assets/img/logos/logo_desktop_xlarge.png"
        ></img>
        {/* <img
          className="logo-icon"
          src="https://promos.yelpcdn.com/food_delivery_icon_2x.png"
        /> */}

        {/* <img src="../../" */}
        {/* <h1>
        <Link to="/">
          <img src="../../images/header_logo_desktop.png"></img>
        </Link>
      </h1> */}
        <div className="navRight">
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
