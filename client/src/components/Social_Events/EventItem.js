import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//{
// events: {
//     allevents: { result },
//   },
// }
const EventItem = (props) => {
  //console.log('props are ', props);
  let {
    events: {
      Event_Name,
      Event_Date,
      Event_Id,
      Event_Location,
      Event_Time,
      Hashtags,
      Rest_Name,
      What_And_Why,
    },
  } = props;
  console.log(
    Event_Date,
    Event_Id,
    Event_Location,
    Event_Time,
    Hashtags,
    Rest_Name,
    What_And_Why
  );
  return (
    <div className="profile bg-light">
      <img className="round-img"></img>
      <div>
        {Event_Name}
        {/* <h3>{result.length}</h3> */}
        <i className="fas fa-calendar-day"></i> {Event_Date}
        <i className="fas fa-clock"></i> {Event_Time}
        <br />
        <i className="fas fa-map-marked-alt"></i> {Event_Location}
        <i className="fas fa-hashtag"></i> {Hashtags}
        <i className="fas fa-quote-left"></i> {What_And_Why}
        <i className="fas fa-quote-right"></i>
      </div>
    </div>
  );
};

EventItem.propTypes = {
  events: PropTypes.object.isRequired,
};

export default EventItem;
