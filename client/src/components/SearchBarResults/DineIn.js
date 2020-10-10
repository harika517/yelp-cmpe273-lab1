import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getRestaurantsByDineIn } from '../../actions/search';

//getRestaurantsByDineIn
const DineIn = ({ getRestaurantsByDineIn, search: { searchresults } }) => {
  useEffect(() => {
    getRestaurantsByDineIn();
  }, []);

  const arrobj = searchresults ? searchresults.result : null;

  return (
    <Fragment>
      <h1 className="bold text-dark"> Restaurants</h1>
      <hr />
      {arrobj ? (
        arrobj.map((item) => (
          <div>
            <h4 className="bold text-dark">{item.Rest_Name}</h4>
            <p className="medium"> {item.Rest_location}</p>
            <p className="medium"> {item.Contact}</p>
            <p className="medium"> {item.Timings}</p>
            <p className="medium"> {item.Description}</p>
            <Link
              to={`/restaurantresults/${item.Rest_Id_signup}`}
              className="btn btn-dark"
            >
              View Restaurant Page
            </Link>
            <hr />
          </div>
        ))
      ) : (
        <h4 className="bold text-dark">
          'OOPS.. No Resturants found with this Criteria'
        </h4>
      )}
    </Fragment>
  );
};

DineIn.propTypes = {
  getRestaurantsByDineIn: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps, { getRestaurantsByDineIn })(DineIn);
