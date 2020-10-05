import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { getEventsRegisteredByMe } from '../../actions/eventregistration';
import { getAllEvents } from '../../actions/events';
import EventItem from '../Social_Events/EventItem';

//action getEventsRegisteredByMe(CustName)
const ViewEventsAttending = ({
  getEventsRegisteredByMe,
  getCurrentProfile,
  getAllEvents,
  profile: { profile, loading },
  eventregister: { customersreg },
  events: { allevents },
  match,
}) => {
  useEffect(() => {
    // getEventsRegisteredByMe(match.params.Cust_Name);
    getAllEvents();
    getCurrentProfile();
    console.log('View Attendees', match.params.Cust_Name);
  }, [loading]);
  useEffect(() => {
    if (profile) {
      getEventsRegisteredByMe(match.params.Cust_Name);
    }
  }, [loading]);
  console.log('inside event attending ', customersreg);
  let { result } = customersreg;
  console.log(result);
  let registeredEventNames = result
    ? result.map((item) => {
        return item.Event_Name;
      })
    : null;
  let result1 = allevents ? allevents.result : null;
  console.log(result1);
  result1 = result1
    ? result1.filter((item) =>
        registeredEventNames
          ? registeredEventNames.includes(item.Event_Name)
          : null
      )
    : null;
  console.log(result1);
  if (result1) {
    return (
      <div>
        <Link to="/dashboard" className="btn btn-dark">
          {' '}
          Go Back
        </Link>
        <Fragment>
          {result1
            ? result1.map((item) => (
                <Fragment>
                  <EventItem key={item.id} events={item} />
                </Fragment>
              ))
            : 'none'}
        </Fragment>
      </div>
    );
  } else {
    return null;
  }
};

ViewEventsAttending.propTypes = {
  getAllEvents: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
  getEventsRegisteredByMe: PropTypes.func.isRequired,
  eventregister: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  eventregister: state.eventregister,
  profile: state.profile,
  events: state.events,
});
export default connect(mapStateToProps, {
  getEventsRegisteredByMe,
  getCurrentProfile,
  getAllEvents,
})(ViewEventsAttending);
