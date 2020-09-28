import React, { Fragment, useEffect } from 'react';
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
      <div className="container_1">
        <div className="leftpane">
          <img src={profile.Cust_ProfilePic} alt="Profile Picture" />
          <h3 className="lead">
            {' '}
            <i className="fas fa-user" />
            {profile.Cust_Name}'s profile
          </h3>
          <hr></hr>
        </div>
        <div className="middlepane">
          <h2>{profile.Cust_Name}</h2>
          <p className="lead">
            {profile.City} {profile.State} {profile.Country}
          </p>
          {/* <Link to="/createprofile" className="btn btn-dark my-1">
            Create Profile
          </Link> */}
          <hr></hr>
          <p className="lead text-dark"> Recent Activity</p>
        </div>
        <div clasNames="rightpane">
          <DashboardActions />
          <hr></hr>
          <p className="lead">About {profile.Cust_Name}</p>
          <div>
            <p className="lead"> Email ID</p>
          </div>
          <div>{profile.Cust_email_id}</div>
        </div>
      </div>
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
