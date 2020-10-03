//background image and search bar and options for Write A Review, Events Login and Signup

import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../images/logo.png';
const Landing = () => {
  return (
    <section className="landing ">
      <div>
        <img class="logo-icon-large" src={'/images/logo.png'}></img>
        <p>Search bar</p>
      </div>
      {/* <div className="search_bar">
        <input type="text"></input>
      </div> */}
    </section>
  );
};

export default Landing;
