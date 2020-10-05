//background image and search bar and options for Write A Review, Events Login and Signup

import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../images/logo.png';
const Landing = () => {
  return (
    <section className="landing ">
      <div className="landing-inner">
        <img class="logo-icon-large" src={'/images/logo.png'}></img>
        <p>Insert Search bar</p>
        <div className="options">
          <ul className="search-options">
            <li>
              <Link to="/curbsidepickup" className="text-light bold medium">
                {' '}
                <i className="fas fa-gift medium" /> Curb Side PickUp
              </Link>
            </li>
            <li>
              <Link to="/dinein" className="text-light bold medium">
                {' '}
                <i className="fas fa-glass-martini-alt medium" /> Dine In
              </Link>
            </li>
            <li>
              <Link to="/yelpdelivery" className="text-light bold medium">
                {' '}
                <i className="fas fa-motorcycle medium" /> Yelp-Delivery
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="search_bar">
        <input type="text"></input>
      </div>
    </section>
  );
};

export default Landing;
