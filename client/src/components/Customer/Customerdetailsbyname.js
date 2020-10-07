import React, { Fragment, useEffect, Component, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCustomerProfileByName } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Customerdetailsbyname = ({
  getCustomerProfileByName,
  profile: { profile },
  match,
}) => {
  useEffect(() => {
    getCustomerProfileByName(match.params.Cust_Name);
  }, [getCustomerProfileByName]);
  //   if (profile) {
  //     console.log('profile status', profile.Cust_Name);
  //   }
  //
  let {
    First_Name,
    Last_Name,
    Date_of_Birth,
    Cust_email_id,
    Phone_Number,
    City,
  } = profile ? profile : { ...null };
  console.log('inside Customerdetailsbyname, profile is', profile);
  return (
    <Fragment>
      {profile ? (
        <Fragment>
          <h3 className="bold text-dark"> Customer Details</h3>
          <Link to="/restaurantdashboard" className="btn btn-dark">
            {' '}
            Return{' '}
          </Link>
          <hr></hr>
          <p className="medium bold">
            <i className="fas fa-user-circle text-dark"></i> {First_Name}{' '}
            {Last_Name}
          </p>
          <p className="medium bold">
            <i className="fas fa-calendar-day text-dark"></i> {Date_of_Birth}
          </p>
          <p className="medium bold">
            <i className="fas fa-envelope-open-text text-dark"></i>{' '}
            {Cust_email_id}
          </p>
          <p className="medium bold">
            <i className="fas fa-map-marked-alt text-dark"></i> {City}
          </p>
          <p className="medium bold">
            <i className="fas fa-phone-alt text-dark"></i> {Phone_Number}
          </p>
        </Fragment>
      ) : (
        'none'
      )}
    </Fragment>
  );
};

Customerdetailsbyname.propTypes = {
  getCustomerProfileByName: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCustomerProfileByName })(
  Customerdetailsbyname
);
