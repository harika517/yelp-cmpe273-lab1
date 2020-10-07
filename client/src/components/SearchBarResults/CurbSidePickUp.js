import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurantsByDelivery } from '../../actions/search';
//getRestaurantsByDelivery

const CurbSidePickUp = ({
  getRestaurantsByDelivery,
  search: { searchresults },
}) => {
  useEffect(() => {
    getRestaurantsByDelivery();
  }, []);
  console.log('Search curbsidepickup', searchresults.result);
  // let revs = reviews.result;
  return (
    <Fragment>
      {searchresults.result
        ? searchresults.result.map((item) => (
            <Fragment>
              <div className="container_2columns">
                <div className="column1">
                  <img src={item.Image} alt="Profile Picture" />
                  <h1 className="x-large text-dark">{item.Rest_Name}</h1>
                  <h4>
                    <i className="fas fa-map-marker-alt"></i>{' '}
                    {item.Rest_location}
                  </h4>
                  <h4>
                    <i className="far fa-clock"></i> {item.Timings}
                  </h4>
                  <h4>{item.Description}</h4>
                  <h3 className="bold text-dark">Reviews</h3>
                  <h4 className="bold">Ratings: </h4>
                  <h4>{item.ratings}</h4>
                  <h4 className="bold">Review:</h4>
                  <h4>{item.review}</h4>
                  <hr></hr>
                </div>

                <div className="column2"></div>
              </div>
            </Fragment>
          ))
        : null}
    </Fragment>
  );
};

CurbSidePickUp.propTypes = {
  getRestaurantsByDelivery: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps, { getRestaurantsByDelivery })(
  CurbSidePickUp
);
