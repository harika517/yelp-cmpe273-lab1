import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//{
// events: {
//     allevents: { result },
//   },
// }
const RestEventItem = (props) => {
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
      Rest_email_id,
    },
  } = props;
  console.log(
    Event_Date,
    Event_Id,
    Event_Location,
    Event_Time,
    Hashtags,
    Rest_Name,
    What_And_Why,
    Rest_email_id
  );
  return (
    <div className="wrapper">
      <div className="cards_wrap">
        <div className="card_item">
          <div className="card_inner">
            <div className="card_top">
              <img className="card_img" src=" " alt="Photo" />
            </div>
            <div className="card_bottom">
              <div className=" card_info">
                <p className="lead title">{Event_Name}</p>
                <p className="medium">
                  <i className="fas fa-calendar-day text-dark"></i> {Event_Date}
                </p>
                <p className="medium">
                  <i className="fas fa-clock text-dark"></i> {Event_Time}
                </p>
                <p className="medium">
                  <i className="fas fa-map-marked-alt text-dark"></i>{' '}
                  {Event_Location}
                </p>
                <p className="medium">{Hashtags}</p>
                <p className="medium">
                  <i className="fas fa-quote-left medium text-dark"></i>{' '}
                  {What_And_Why}
                  <i className="fas fa-quote-right medium text-dark"></i>
                </p>
                <p className="medium">
                  <i className="fas fa-edit text-dark"></i> {Rest_email_id}
                </p>
                <Link
                  className="btn btn-dark"
                  to={`/viewattendees/${Event_Name}`}
                >
                  {' '}
                  View Attendees
                </Link>
                <br></br>
                <br></br>
                <Link
                  className="btn btn-dark"
                  to={`/restaurants/editevent/${Event_Name}`}
                >
                  {' '}
                  Edit Event
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RestEventItem.propTypes = {
  events: PropTypes.object.isRequired,
};

export default RestEventItem;
