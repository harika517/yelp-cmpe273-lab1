//background image and search bar and options for Write A Review, Events Login and Signup

import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRestaurantsByInputText } from '../../actions/search';
// import logo from '../../images/logo.png';
const Landing = () => {
  //   useEffect(()=>{
  // // get results action
  //   }, [])

  const [formData, setFormData] = useState({
    search: '',
  });

  const { search } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    getRestaurantsByInputText(formData);
    //get results Action
  };

  return (
    <section className="landing ">
      <div className="landing-inner">
        {/* <img class="logo-icon-large" src={'/images/logo.png'}></img> */}
        <img
          class="logo-icon-large"
          src="https://s3-media4.fl.yelpcdn.com/assets/srv0/yelp_styleguide/c3484759c57a/assets/img/logos/logo_desktop_xlarge.png"
        />
        <br />
        <div className="search-container">
          <form className="search-form" onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              className="medium"
              placeholder="Dishes, Location, Cuisine, Restaurants..."
              name="search"
              value={search}
              onChange={(e) => onChange(e)}
            />
            <Link
              to={`/searchbar/results/${search}`}
              className="btn-search"
              type="submit"
            >
              <i className="fa fa-search medium"></i>
            </Link>
          </form>
        </div>
        <br />
        <div className="options">
          <ul className="search-options">
            <li>
              <Link to="/restaurantresults" className="text-light bold medium">
                {' '}
                <i className="fas fa-utensils medium" /> Restaurants
              </Link>
            </li>
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
