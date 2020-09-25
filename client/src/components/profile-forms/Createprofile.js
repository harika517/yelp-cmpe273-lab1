import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Createprofile = (props) => {
  const [formData, setFormData] = useState({
    First_Name: '',
    Last_Name: '',
    Date_of_Birth: '',
    City: '',
    State: '',
    Country: '',
    Nick_Name: '',
    Headline: '',
  });

  const {
    First_Name,
    Last_Name,
    Date_of_Birth,
    City,
    State,
    Country,
    Nick_Name,
    Headline,
  } = formData;
  return <div></div>;
};

Createprofile.propTypes = {};

export default o;
