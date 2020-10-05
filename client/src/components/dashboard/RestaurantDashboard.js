import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentRestProfile } from '../../actions/profile';
import { getReviewsByRestName } from '../../actions/review';
import RestaurantActions from './RestaurantActions';
import { Result } from 'express-validator';
import auth from '../../reducers/auth';
import { json } from 'body-parser';

const RestaurantDashboard = ({
  match,
  getCurrentRestProfile,
  getReviewsByRestName,
  auth,
  profile: { profile, loading },
  review: { reviews },
}) => {
  console.log('before ', profile);
  if (profile) {
    console.log('match RestName', profile.Rest_Name);
  }
  //const { Rest_Name, Rest_email_id, Rest_location, Description } = profile;
  console.log('Match criteria', match.params);
  console.log('calling useeffect');
  // useEffect(() => {
  //   if (profile) {
  //     //console.log('Inside profile', profile.Rest_Name);
  //     getReviewsByRestName(profile.Rest_Name);
  //   }
  // }, [getReviewsByRestName]);
  useEffect(() => {
    getCurrentRestProfile();
  }, [loading]);
  useEffect(() => {
    //console.log('inside useeffect');
    // const restname = profile.Rest_Name;
    //getCurrentRestProfile();
    if (profile) {
      getReviewsByRestName(profile.Rest_Name);
    }
  }, [loading]);

  // if (review) {
  //   console.log('after useeffect', review);
  // } else {
  //   let review = '';
  // }

  // let {
  //   review, Date
  // } = review ? review.result[0] : { ...null };

  console.log('restdash profile values are', profile);
  let revs = reviews.result;
  console.log('restdash reviews are ', revs);
  if (profile) {
    return (
      <Fragment>
        <div className="container_2columns">
          <div className="column1">
            <h1 className="x-large text-dark">{profile.Rest_Name}</h1>
            <h4>
              <i className="fas fa-map-marker-alt"></i> {profile.Rest_location}
            </h4>
            <h4>
              <i className="far fa-clock"></i> {profile.Timings}
            </h4>
            <h4>{profile.Description}</h4>
            {/* <br></br> */}
            <h4 ClassName="lead text-dark"> Available </h4>
            {profile.Curbside_PickUp === 'yes' ? (
              <h4 className="lead text-dark">
                <i className="fas fa-map-marker" /> CurbSide PickUp
              </h4>
            ) : (
              <h4 className="lead text-dark">
                <i className="fas fa-map-marker" />
                CurbSide PickUp option is temporarily unavailable
              </h4>
            )}
            {profile.Dine_In === 'yes' ? (
              <h4 className="lead text-dark">
                <i className="fas fa-map-marker" /> Dine In
              </h4>
            ) : (
              <h4 className="lead text-dark">
                <i className="fas fa-map-marker" />
                Dine In option is temporarily unavailable
              </h4>
            )}
            {profile.Yelp_Delivery === 'yes' ? (
              <h4 className="lead text-dark">
                <i className="fas fa-map-marker" /> Yelp Delivery
              </h4>
            ) : (
              <h4 className="lead text-dark">
                <i className="fas fa-map-marker" />
                Yelp Delivery is temporarily unavailable
              </h4>
            )}
            <hr></hr>
            <Link to="/restaurantevents" className=" btn btn-dark">
              Events
            </Link>
            <Link to="/restaurantprofile" className=" btn btn-dark">
              Create New Profile
            </Link>
            <Link to="#!" className=" btn btn-primary">
              <i className="fas fa-camera"></i> Add Photo
            </Link>
            <h3 className="bold text-dark">Reviews</h3>
            {revs
              ? revs.map((item) => (
                  <h4>
                    (
                    {item.ratings === 4 ? (
                      <div>
                        <i className="fas fa-star text-dark"></i>
                        <i className="fas fa-star text-dark"></i>
                        <i className="fas fa-star text-dark"></i>
                        <i className="fas fa-star text-dark"></i>
                        <i className="far fa-star text-dark"></i>
                      </div>
                    ) : (
                      'none'
                    )}
                    ){item.Date}
                    <br></br>
                    {item.review}
                    <hr />
                  </h4>
                ))
              : 'none'}
          </div>
          <div className="column2">
            <Link to="/restaurant/menu" className="btn btn-dark">
              <i className="fas fa-utensils"></i>
              View Menu
            </Link>
            <Link
              to={`/restaurant/orders/${profile.Rest_Name}`}
              className="btn btn-dark"
            >
              <i className="fas fa-binoculars"></i>
              View Orders
            </Link>
            <br></br>
            <br></br>
            <Link to="/editrestaurantprofile" className="lead text-dark">
              <i className="fas fa-id-card"> </i> Edit Profile
            </Link>
            <h4 className=" lead text-dark">
              <i className="fas fa-phone-alt" /> Contact
            </h4>
            <h5>{profile.Contact}</h5>
            <h4 className=" lead text-dark">
              <i className="fas fa-edit" /> Write to Us
            </h4>
            <h5>{profile.Rest_email_id}</h5>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return null;
  }
};

RestaurantDashboard.propTypes = {
  getCurrentRestProfile: PropTypes.func.isRequired,
  getReviewsByRestName: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  review: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  review: state.review,
});

export default connect(mapStateToProps, {
  getCurrentRestProfile,
  getReviewsByRestName,
})(RestaurantDashboard);
