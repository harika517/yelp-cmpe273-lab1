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
  console.log(profile);
  useEffect(() => {
    getCurrentRestProfile();
  }, []);
  console.log('restdash', profile);
  return (
    <Fragment>
      <Link to="/restaurantevents" className=" btn btn-dark">
        Events
      </Link>
      <p>Restaurant main Page</p>
      <p>{JSON.stringify(profile)}</p>
    </Fragment>
  );
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
