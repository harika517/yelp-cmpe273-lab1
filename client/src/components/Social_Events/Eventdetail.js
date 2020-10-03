import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { getEventDetail } from '../../actions/events';
import { registerEvent } from '../../actions/eventregistration';
import auth from '../../reducers/auth';
import events from '../../reducers/events';
//Restaurantmenuitems = eventdetails
//getCurrentProfile , getEventDetail
const Eventdetail = ({
  match,
  auth,
  getEventDetail,
  getCurrentProfile,
  profile: { profile },
  events: { event },
  history,
}) => {
  useEffect(() => {
    getEventDetail(match.params.Event_Name);
    getCurrentProfile();
  }, []);

  const onSubmit = () => {
    console.log(
      'onSubmit clicked, ',
      profile.Cust_Name,
      event.result[0].Event_Name
    );
    registerEvent(profile.Cust_Name, event.result[0].Event_Name);
  };

  // (e) => {
  //   console.log('Fresh Regestration called');
  //   e.preventDefault();
  //   console.log(
  //     'inside onSubmit, ',
  //     profile.Cust_Name,
  //     event.result[0].Event_Name
  //   );
  //   registerEvent(profile.Cust_Name, event.result[0].Event_Name);
  //   // console.log('match param', );
  // };

  console.log('inside EventDetail, ', event);
  let {
    Event_Date,
    Event_Id,
    Event_Location,
    Event_Name,
    Event_Time,
    Hashtags,
    Rest_Name,
    Rest_email_id,
    What_And_Why,
  } = event ? event.result[0] : { ...null };
  return (
    <div>
      <Link to="/events" className="btn btn-dark">
        Go Back
      </Link>
      <Link to="/events" className="btn btn-dark" onClick={onSubmit}>
        Register
      </Link>
      <Link to="/events" className="btn btn-primary">
        Cancel
      </Link>
      <hr />
      <h2 className="bold text-dark"> {Event_Name ? Event_Name : ' '} </h2>
      <p className="medium">
        <i className="fas fa-calendar-day text-dark"> </i>
        {Event_Date ? Event_Date : ' '}
      </p>
      <p className="medium">
        <i className="fas fa-calendar-day text-dark"> </i>
        {Event_Time ? Event_Time : ' '}
      </p>
      <p className="medium">
        <i className="fas fa-calendar-day text-dark"> </i>
        {Event_Location ? Event_Location : ' '}
      </p>
      <p className="medium"> {Hashtags ? Hashtags : ' '} </p>
      <hr />
      <h4 className="bold text-dark"> What & Why </h4>
      <p className="medium"> {What_And_Why ? What_And_Why : ' '} </p>
    </div>
  );
};

Eventdetail.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getEventDetail: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  registerEvent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  events: state.events,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getEventDetail,
  registerEvent,
})(Eventdetail);
