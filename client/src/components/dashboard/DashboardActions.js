import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/editProfile" className="btn btn-light">
        <i className="fas fa-user-circle text-dark"></i>
        Edit Profile
      </Link>
      <Link to="/basicDetails" className="btn btn-light">
        <i className="fas fa-user-circle text-dark"></i>
        Basic Details
      </Link>
      <Link to="/AboutDetails" className="btn btn-light">
        <i className="fas fa-user-circle text-dark"></i>
        About Details
      </Link>
    </div>
  );
};
