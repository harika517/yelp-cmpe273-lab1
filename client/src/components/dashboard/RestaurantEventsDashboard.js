import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import RestaurantActions from './RestaurantActions';
import { connect } from 'react-redux';
import { getRestaurantEvents } from '../../actions/events';
import auth from '../../reducers/auth';

const RestaurantEventsDashboard = ({
  getRestaurantEvents,
  // auth: { customer, isAuthenticated },
  profile: { profile },
  events: { event },
}) => {
  console.log('qwer', profile);
  useEffect(() => {
    getRestaurantEvents(profile.Rest_Name);
  }, []);

  // console.log('Customer' + customer + isAuthenticated);
  return (
    <div>
      <Fragment>
        <h1>
          Customer: <p>{JSON.stringify(event)}</p>
        </h1>
        <Link to="/restaurantdashboard" className="lead text-primary">
          {' '}
          Return to Restaurant Page
        </Link>
        <br />
        <br />
        <RestaurantActions />
      </Fragment>
    </div>
  );
};

RestaurantEventsDashboard.propTypes = {
  getRestaurantEvents: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  events: state.event,
});

export default connect(mapStateToProps, { getRestaurantEvents })(
  RestaurantEventsDashboard
);
