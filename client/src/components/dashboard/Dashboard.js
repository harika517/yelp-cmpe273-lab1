import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import { Result } from 'express-validator';
import auth from '../../reducers/auth';

const Dashboard = ({
  getCurrentProfile,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading ? (
    ''
  ) : (
    <Fragment>
      <div className="container_3columns">
        {/* <div className="columns"> */}
        <div className="column_1">
          <img src={profile.Cust_ProfilePic} alt="Profile Picture" />
          <h3 className="lead">
            {' '}
            <i className="fas fa-user" />
            {profile.Cust_Name}'s profile
          </h3>
          <hr></hr>
          <Link to="/viewrestaurants" className="btn btn-dark">
            {' '}
            Restaurants{' '}
          </Link>
          <hr></hr>
          <Link to="/ordersplaced" className="btn btn-dark">
            {' '}
            Order History{' '}
          </Link>
          <hr></hr>
          <Link
            to={`/viewregisteredevents/${profile.Cust_Name}`}
            className="btn btn-dark"
          >
            {' '}
            Events Attending{' '}
          </Link>
          <hr></hr>
        </div>
        {/* </div> */}
        {/* <div className="columns"> */}
        <div className="column_2">
          <h2>{profile.Cust_Name}</h2>
          <p className="lead">
            {profile.City} {profile.State} {profile.Country}
            <p className="lead text-dark"> Recent Activity</p>
          </p>
        </div>
        {/* </div> */}
        {/* <div className="columns"> */}
        <div className="column_3">
          <DashboardActions />
          <p className="lead">About {profile.Cust_Name}</p>
          {Object.keys(profile).map(
            (key) => {
              if (
                profile[key] !== '' &&
                [
                  'Nick_Name',
                  'Headline',
                  'Yelping_Since',
                  'Things_I_Love',
                  'My_Blog_Or_Website',
                  'Find_Me_In',
                  'My_Favourite_Movie',
                  'Current_Crush',
                ].includes(key)
              ) {
                return (
                  <div>
                    <p className="lead">{key.replaceAll('_', ' ')}</p>
                    <h5>{profile[key]}</h5>
                  </div>
                );
              }
            }
            // console.log(key + ' : ' + profile[key])
          )}
        </div>
        {/* </div> */}
      </div>
      {/* <div className="row">
        <div className="column"> */}
      {/* <img src={profile.Cust_ProfilePic} alt="Profile Picture" />
      <h3 className="lead">
        {' '}
        <i className="fas fa-user" />
        {profile.Cust_Name}'s profile
      </h3> */}
      {/* </div>
        <div className="column"> */}
      {/* <h2>{profile.Cust_Name}</h2>
      <p className="lead">
        {profile.City} {profile.State} {profile.Country}
      </p> */}
      {/* <Link to="/createprofile" className="btn btn-dark my-1">
            Create Profile
          </Link> */}

      {/* <p className="lead text-dark"> Recent Activity</p> */}
      {/* </div>
        <div clasNames="column"> */}
      {/* <DashboardActions />

      <p className="lead">About {profile.Cust_Name}</p>

      {Object.keys(profile).map(
        (key) => {
          if (
            profile[key] !== '' &&
            [
              'Nick_Name',
              'Headline',
              'Yelping_Since',
              'Things_I_Love',
              'My_Blog_Or_Website',
              'Find_Me_In',
              'My_Favourite_Movie',
              'Current_Crush',
            ].includes(key)
          ) {
            return (
              <div>
                <p className="lead">{key.replaceAll('_', ' ')}</p>
                <h5>{profile[key]}</h5>
              </div>
            );
          }
        }
        // console.log(key + ' : ' + profile[key])
      )} */}
      {/* </div>
      </div> */}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
