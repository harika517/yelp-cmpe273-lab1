import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { Result } from 'express-validator';

const Dashboard = ({
  getCurrentProfile,
  auth: { customer },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return (
    <Fragment>
      <div>
        <p>{customer && customer.Cust_Id}</p>
        <Link to="/dashboard" className="text-dark">
          {' '}
          <i className="fas fa-user" /> Profile Overview
        </Link>
      </div>
      {profile !== null ? (
        <Fragment>has</Fragment>
      ) : (
        <Fragment>has not</Fragment>
      )}
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
