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
    <Fragment>
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <Link
                to={`/viewevent/${Event_Name}`}
                className="text-dark medium bold title"
              >
                {Event_Name}
              </Link>
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
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    // <div className="wrapper">
    //   <div className="cards_wrap">
    //     <div className="card_item">
    //       <div className="card_inner">
    //         <div className="card_top">
    //           <img className="card_img" src=" " alt="Photo" />
    //         </div>
    //         <div className="card_bottom">
    //           {/* <div className="card_category">Travel</div> */}
    //           <div className=" card_info">
    //             <Link to={`/viewevent/${Event_Name}`} className="lead title">
    //               {Event_Name}
    //             </Link>
    //             <p className="medium">
    //               <i className="fas fa-calendar-day text-dark"></i> {Event_Date}
    //             </p>
    //             <p className="medium">
    //               <i className="fas fa-clock text-dark"></i> {Event_Time}
    //             </p>
    //             <p className="medium">
    //               <i className="fas fa-map-marked-alt text-dark"></i>{' '}
    //               {Event_Location}
    //             </p>
    //             <p className="medium">{Hashtags}</p>
    //             {/* <p className="medium">
    //               <i className="fas fa-quote-left medium text-dark"></i>{' '}
    //               {What_And_Why}
    //               <i className="fas fa-quote-right medium text-dark"></i>
    //             </p> */}
    //             {/* <Link to="#!" className="btn btn-dark">
    //               {' '}
    //               Register
    //             </Link> */}
    //           </div>
    //           {/* <div className="card_creator">By Alex Kato</div> */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
