import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurantsByYelpDelivery } from '../../actions/search';
//getRestaurantsByYelpDelivery
const YelpDelivery = ({ getRestaurantsByYelpDelivery }) => {
  useEffect(() => {
    getRestaurantsByYelpDelivery();
    // search: { searchresults }
  }, []);

  return (
    <Fragment>
      <div>Load Yelp Delievry here</div>
      {/* {searchresults.result
        ? searchresults.result.map((item) => <p>{item.Rest_Name}</p>)
        : null} */}
    </Fragment>
  );
};

YelpDelivery.propTypes = {
  getRestaurantsByYelpDelivery: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  //   search: state.search,
});

export default connect(mapStateToProps, { getRestaurantsByYelpDelivery })(
  YelpDelivery
);
