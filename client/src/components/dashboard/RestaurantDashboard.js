import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentRestProfile } from '../../actions/profile';
import RestaurantActions from './RestaurantActions';
import { Result } from 'express-validator';
import auth from '../../reducers/auth';
import { json } from 'body-parser';

const RestaurantDashboard = ({
  getCurrentRestProfile,
  auth,
  profile: { profile, loading },
}) => {
  console.log('before ', profile);
  //const { Rest_Name, Rest_email_id, Rest_location, Description } = profile;
  useEffect(() => {
    getCurrentRestProfile();
  }, []);
  console.log('restdash', profile);
  if (profile) {
    return (
      <Fragment>
        <div className="container_2columns">
          <div className="column1">
            <h1 className="x-large text-dark">{profile.Rest_Name}</h1>
            <h4>
              <i className="fas fa-map-marker-alt"></i> {profile.Rest_location}
            </h4>
            <h4>
              <i className="far fa-clock"></i> {profile.Timings}
            </h4>
            <h4>{profile.Description}</h4>
            <hr></hr>
            <Link to="/restaurantevents" className=" btn btn-dark">
              Events
            </Link>
            <Link to="/restaurantprofile" className=" btn btn-dark">
              Edit Profile
            </Link>
            <Link to="#!" className=" btn btn-primary">
              <i className="fas fa-camera"></i> Add Photo
            </Link>
          </div>
          <div className="column2">
            <Link to="#!" className="btn btn-dark">
              <i className="fas fa-utensils"></i>
              View Menu
            </Link>
            <Link to="#!" className="btn btn-dark">
              <i className="fas fa-binoculars"></i>
              View Orders
            </Link>
            <br></br>
            <br></br>
            <h4 className=" lead text-dark">
              <i className="fas fa-phone-alt" /> Contact
            </h4>
            <h5>{profile.Contact}</h5>
            <h4 className=" lead text-dark">
              <i className="fas fa-edit" /> Write to Us
            </h4>
            <h5>{profile.Rest_email_id}</h5>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return null;
  }
};

RestaurantDashboard.propTypes = {
  getCurrentRestProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentRestProfile })(
  RestaurantDashboard
);
