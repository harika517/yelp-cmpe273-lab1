import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/addPhotos" className=" lead text-primary">
        <i className="fas fa-camera-retro text-primary"></i> Add Profile Photos
      </Link>
      <br />
      <br />
      <Link to="/editProfile" className=" lead text-primary">
        <i className="fas fa-id-card text-primary"></i> Edit Profile
      </Link>
      <br />
      <br />
      {/* <Link to="/basicDetails" className="lead text-primary">
        <i className="fas fa-user-circle text-primary"></i> Basic Details
      </Link>
      <br />
      <br />
      <Link to="/AboutDetails" className=" lead text-primary">
        <i className="fas fa-user-circle text-primary"></i> About Details
      </Link>
      <br />
      <br /> */}
    </div>
  );
};

export default DashboardActions;
