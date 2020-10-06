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
  return (
    <Fragment>
      <div>display curb side restaurants</div>
      {searchresults.result
        ? searchresults.result.map((item) => <p>{item.Rest_Name}</p>)
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
