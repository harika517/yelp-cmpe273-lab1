//background image and search bar and options for Write A Review, Events Login and Signup

import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../images/logo.png';
const Landing = () => {
  return (
    <section className="landing ">
      <div className="landing-inner">
        <img class="logo-icon-large" src={'/images/logo.png'}></img>
        {/* <p>Insert Search bar</p>
        <div className="search_bar">
          <input type="text"></input>
        </div> */}
        {/* <form>
          <div className="form-box">
            <button className="btn btn-light">Find</button>
            <input
              className="search_bar"
              name="search"
              type="text"
              placeholder="Dishes, Cuisines, 
            location..."
            />
            <button className="btn btn-dark" type="button">
              <i className="fas fa-search" />
            </button>
          </div>
        </form> */}
        <form>
          <div className="form-group">
            <label className="pseudo-input">
              <span className="pseudo-input_text">Find</span>
              <span className="pseudo-input_field-holder">
                <input
                  placeholder="tacos, cheap dinner, Max’s"
                  value=""
                  class="pseudo-input_field"
                  type="text"
                />
              </span>
            </label>
          </div>
        </form>
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
    </section>
  );
};

export default Landing;
