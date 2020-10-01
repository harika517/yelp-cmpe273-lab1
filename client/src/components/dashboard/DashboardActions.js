import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import insertImage from '../../actions/uploadimages';

const DashboardActions = (insertImage) => {
  const [formData, setFormData] = useState({
    Cust_Images: '',
  });

  const { Cust_Images } = formData;
  console.log('here photo');
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    insertImage(formData);
  };

  return (
    <div className="dash-buttons">
      <Link to="/addPhotos" className=" lead text-primary">
        <i className="fas fa-camera-retro text-primary"></i> Add Profile Photos
      </Link>{' '}
      <input
        type="file"
        name="Cust_Images"
        onChange={(e) => onChange(e)}
        value={Cust_Images}
      />
      <br />
      <br />
      <Link to="/editProfile" className=" lead text-primary">
        <i className="fas fa-id-card text-primary"></i> Edit Profile
      </Link>
      <br />
      <br />
      <Link to="/events" className=" lead text-primary">
        <i className="fas fa-calendar-alt text-primary"></i> Events
      </Link>
      <br />
      <br />
      <Link to="/reviews" className=" lead text-primary">
        <i className="fas fa-edit text-primary"></i> Write a Review
      </Link>
    </div>
  );
};

DashboardActions.propTypes = {
  insertImage: PropTypes.func.isRequired,
};

export default connect(null, { insertImage })(withRouter(DashboardActions));
