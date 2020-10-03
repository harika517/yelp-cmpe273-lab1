import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//{
// events: {
//     allevents: { result },
//   },
// }
const RestaurantCard = (props) => {
  //console.log('props are ', props);
  let {
    profile: { Rest_Name, Timings, Contact, Description },
  } = props;
  console.log(Rest_Name, Timings, Contact, Description);
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
              <div className=" card_info">
                <Link to={`/review/${Rest_Name}`} className="lead title">
                  {Rest_Name}
                </Link>
                <p className="medium">
                  <i className="fas fa-calendar-day text-dark"></i>{' '}
                  {Timings ? Timings : ' '}
                </p>
                <p className="medium">
                  <i className="fas fa-clock text-dark"></i>{' '}
                  {Contact ? Contact : ''}
                </p>
                <p className="medium">
                  <i className="fas fa-map-marked-alt text-dark"></i>{' '}
                  {Description ? Description : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RestaurantCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

export { RestaurantCard };
