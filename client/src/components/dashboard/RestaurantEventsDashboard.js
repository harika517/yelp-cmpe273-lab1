import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import RestaurantActions from './RestaurantActions';
import { connect } from 'react-redux';
import { getRestaurantEvents } from '../../actions/events';
import { getCurrentRestProfile } from '../../actions/profile';
import RestEventItem from '../Social_Events/RestEventItem';
import auth from '../../reducers/auth';

const RestaurantEventsDashboard = ({
  getCurrentRestProfile,
  getRestaurantEvents,
  events: {
    allevents: { result },
    loading,
  },
}) => {
  useEffect(() => {
    getRestaurantEvents();
  }, [loading]);

  // console.log('Customer' + customer + isAuthenticated);
  return (
    <div>
      <Fragment>
        <Link to="/restaurantdashboard" className="lead text-primary">
          {' '}
          Return to Restaurant Page
        </Link>
        <br />
        <br />
        <RestaurantActions />
        <hr></hr>
        <Fragment>
          {loading ? (
            ' '
          ) : (
            <Fragment>
              <h3 className="text-dark"> Events</h3>
              <div>
                {result.length > 0 ? (
                  result.map((item) => (
                    <RestEventItem key={item.id} events={item} />
                  ))
                ) : (
                  <h4> No Events Found</h4>
                )}
              </div>
            </Fragment>
          )}
        </Fragment>
      </Fragment>
    </div>
  );
};

RestaurantEventsDashboard.propTypes = {
  getRestaurantEvents: PropTypes.func.isRequired,
  getCurrentRestProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // auth: state.auth,
  profile: state.profile,
  events: state.events,
});

export default connect(mapStateToProps, {
  getRestaurantEvents,
  getCurrentRestProfile,
})(RestaurantEventsDashboard);
