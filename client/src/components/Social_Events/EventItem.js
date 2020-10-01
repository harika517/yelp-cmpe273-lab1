import React, { Fragment } from 'react';
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
    <div className="wrapper">
      <div className="cards_wrap">
        <div className="card_item">
          <div className="card_inner">
            <div className="card_top">
              <img className="card_img" src=" " alt="Photo" />
            </div>
            <div className="card_bottom">
              {/* <div className="card_category">Travel</div> */}
              <div className="card_info">
                <p className="title">{Event_Name}</p>
                <p>
                  <i className="fas fa-calendar-day"></i> {Event_Date}
                </p>
                <p>
                  <i className="fas fa-clock"></i> {Event_Time}
                </p>
                <p>
                  <i className="fas fa-map-marked-alt"></i> {Event_Location}
                </p>
                <p>
                  <i className="fas fa-hashtag"></i> {Hashtags}
                </p>
                <p>
                  <i className="fas fa-quote-left small"></i> {What_And_Why}
                  <i className="fas fa-quote-right small"></i>
                </p>
              </div>
              {/* <div className="card_creator">By Alex Kato</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="profile bg-light">
    //   <img className="round-img"></img>
    //   <div>
    //     {Event_Name}
    //     {/* <h3>{result.length}</h3> */}
    //     <i className="fas fa-calendar-day"></i> {Event_Date}
    //     <i className="fas fa-clock"></i> {Event_Time}
    //     <br />
    //     <i className="fas fa-map-marked-alt"></i> {Event_Location}
    //     <i className="fas fa-hashtag"></i> {Hashtags}
    //     <i className="fas fa-quote-left"></i> {What_And_Why}
    //     <i className="fas fa-quote-right"></i>
    //   </div>
    // </div>
  );
};

EventItem.propTypes = {
  events: PropTypes.object.isRequired,
};

export default EventItem;
