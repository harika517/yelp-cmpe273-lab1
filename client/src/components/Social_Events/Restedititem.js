import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getEventDetail,
  updateEventByName,
  createEvent,
} from '../../actions/events';
//i should eventname in params
//getEventDetail(Event_Name)
//updateEventByName
//formData,
// Event_Name,
// history,
// edit
//createEvent
const Restedititem = ({
  match,
  getEventDetail,
  // createEvent,
  updateEventByName,
  events: { event, loading },
  history,
}) => {
  const [formData, setFormData] = useState({
    Event_Name: '',
    Event_Date: '',
    Event_Time: '',
    Event_Location: '',
    Hashtags: '',
    What_And_Why: '',
    Rest_Name: '',
    Rest_email_id: '',
  });

  const {
    Event_Name,
    Event_Date,
    Event_Time,
    Event_Location,
    Hashtags,
    What_And_Why,
    Rest_Name,
    Rest_email_id,
  } = formData;

  if (event) {
    console.log('Edit Event', event.result[0].Event_Location);
  }
  useEffect(() => {
    getEventDetail(match.params.Event_Name);
    setFormData({
      Event_Name:
        loading || !event.result[0].Event_Name
          ? ''
          : event.result[0].Event_Name,
      Event_Date:
        loading || !event.result[0].Event_Date
          ? ''
          : event.result[0].Event_Date,
      Event_Time:
        loading || !event.result[0].Event_Time
          ? ''
          : event.result[0].Event_Time,
      Event_Location:
        loading || !event.result[0].Event_Location
          ? ''
          : event.result[0].Event_Location,
      Hashtags:
        loading || !event.result[0].Hashtags ? '' : event.result[0].Hashtags,
      What_And_Why:
        loading || !event.result[0].What_And_Why
          ? ''
          : event.result[0].What_And_Why,
      Rest_Name:
        loading || !event.result[0].Rest_Name ? '' : event.result[0].Rest_Name,
      Rest_email_id:
        loading || !event.result[0].Rest_email_id
          ? ''
          : event.result[0].Rest_email_id,
    });
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateEventByName(formData, Event_Name, history);
  };

  return (
    <Fragment>
      <h3 className="text-dark">Update Event</h3>
      <hr></hr>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label for="Rest_Name">Event Sponsorer</label>
          <input
            type="text"
            name="Rest_Name"
            value={Rest_Name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Event_Name">Event Name</label>
          <input
            type="text"
            name="Event_Name"
            value={Event_Name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Event_Date">Event Date</label>
          <br />
          <input
            type="date"
            name="Event_Date"
            value={Event_Date}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Event_Time">Event Time</label>
          <br />
          <input
            type="text"
            name="Event_Time"
            value={Event_Time}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Event_Location">Event Location</label>
          <br />
          <input
            type="text"
            name="Event_Location"
            value={Event_Location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Rest_email_id">Write to Us</label>
          <br />
          <input
            type="text"
            name="Rest_email_id"
            value={Rest_email_id}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Hashtags">Hashtags</label>
          <br />
          <input
            type="text"
            name="Hashtags"
            value={Hashtags}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="What_And_Why">What & Why</label>
          <br />
          <textarea
            rows="4"
            cols="50"
            name="What_And_Why"
            value={What_And_Why}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>

        <input type="submit" className="btn btn-dark my-1" />
        <Link className="btn btn-light my-1" to="/restaurantevents">
          Cancel
        </Link>
      </form>
    </Fragment>
  );
};

Restedititem.propTypes = {
  getEventDetail: PropTypes.func.isRequired,
  // createEvent: PropTypes.func.isRequired,
  updateEventByName: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  events: state.events,
});
export default connect(mapStateToProps, { getEventDetail, updateEventByName })(
  withRouter(Restedititem)
);
