import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import editProfilePic from '../../actions/uploadimages';

const DashboardActions = (insertImage) => {
  const [formData, setFormData] = useState({
    Cust_ProfilePic: '',
  });

  const { Cust_ProfilePic } = formData;
  console.log('here photo');
  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  //   insertImage(formData);
  // };

  const fileHandler = (event) => {
    console.log(event.target.files[0].name);
  };

  const fileSave = () => {
    console.log('reached file save');
  };

  return (
    <div className="dash-buttons">
      <Link to="/addPhotos" className=" lead text-primary">
        <i className="fas fa-camera-retro text-primary"></i> Add Profile Photos
      </Link>{' '}
      <input
        type="file"
        name="Cust_Images"
        //onChange={(e) => onChange(e)}
        onChange={fileHandler}
        value={Cust_ProfilePic}
      />
      <button onClick={fileSave}>Upload</button>
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
      <Link to="/viewrestaurants" className=" lead text-primary">
        <i className="fas fa-edit text-primary"></i> Write a Review
      </Link>
    </div>
  );
};

DashboardActions.propTypes = {
  insertImage: PropTypes.func.isRequired,
};

export default connect(null, { editProfilePic })(withRouter(DashboardActions));
