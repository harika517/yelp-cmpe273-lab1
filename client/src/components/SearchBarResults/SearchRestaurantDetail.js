import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRestByID } from '../../actions/profile';
import { getReviewsByRestId } from '../../actions/review';

const SearchRestaurantDetail = ({
  getRestByID,
  restprofile: { rest_profile, loading },
  review: { reviews },
  getReviewsByRestId,
  match,
}) => {
  useEffect(() => {
    getRestByID(match.params.Rest_Id_signup);
  }, [loading]);

  useEffect(() => {
    if (rest_profile) {
      getReviewsByRestId(rest_profile.result[0].Rest_Id_signup);
    }
  }, [loading]);

  let {
    Rest_Name,
    Rest_location,
    Timings,
    Curbside_PickUp,
    Dine_In,
    Yelp_Delivery,
    Description,
    Contact,
    Rest_email_id,
  } = rest_profile ? rest_profile.result[0] : { ...null };

  let revs = reviews.result;

  return (
    <div>
      <Fragment>
        {rest_profile ? (
          <Fragment>
            <div className="container_2columns">
              <div className="column1">
                <h1 className="x-large text-dark">{Rest_Name}</h1>
                <h4>
                  <i className="fas fa-map-marker-alt"></i> {Rest_location}
                </h4>
                <h4>
                  <i className="far fa-clock"></i> {Timings}
                </h4>
                <h4>{Description}</h4>
                {/* <br></br> */}
                <h4 className=" lead text-dark">
                  <i className="fas fa-phone-alt" /> Contact
                </h4>
                <h5>{Contact}</h5>
                <h4 className=" lead text-dark">
                  <i className="fas fa-edit" /> Write to Us
                </h4>
                <h5>{Rest_email_id}</h5>

                <h4 ClassName="lead text-dark"> Available </h4>
                {Curbside_PickUp === 'yes' ? (
                  <h4 className="lead text-dark">
                    <i className="fas fa-map-marker" /> CurbSide PickUp
                  </h4>
                ) : (
                  <h4 className="lead text-dark">
                    <i className="fas fa-map-marker" />
                    CurbSide PickUp option is temporarily unavailable
                  </h4>
                )}
                {Dine_In === 'yes' ? (
                  <h4 className="lead text-dark">
                    <i className="fas fa-map-marker" /> Dine In
                  </h4>
                ) : (
                  <h4 className="lead text-dark">
                    <i className="fas fa-map-marker" />
                    Dine In option is temporarily unavailable
                  </h4>
                )}
                {Yelp_Delivery === 'yes' ? (
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
                <h3 className="bold text-dark">Reviews</h3>
                {revs
                  ? revs.map((item) => (
                      <h4>
                        {item.Date}
                        <br></br>

                        {item.review}
                        <hr />
                      </h4>
                    ))
                  : 'none'}
              </div>
              <div className="column2">
                <p>Put map Here</p>
              </div>
            </div>
          </Fragment>
        ) : (
          'none'
        )}
      </Fragment>
    </div>
  );
};

SearchRestaurantDetail.propTypes = {
  getRestByID: PropTypes.func.isRequired,
  restprofile: PropTypes.object.isRequired,
  getReviewsByRestId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  restprofile: state.restprofile,
  review: state.review,
});

export default connect(mapStateToProps, { getRestByID, getReviewsByRestId })(
  SearchRestaurantDetail
);
