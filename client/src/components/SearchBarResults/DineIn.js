import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurantsByDineIn } from '../../actions/search';

//getRestaurantsByDineIn
const DineIn = ({
  getRestaurantsByDineIn,
  // search: { searchresults }
}) => {
  useEffect(() => {
    getRestaurantsByDineIn();
  }, []);
  return (
    <Fragment>
      <div>Load Dine ip restaurants here</div>
      {/* {searchresults.result
        ? searchresults.result.map((item) => <p>{item.Rest_Name}</p>)
        : null} */}
    </Fragment>
  );
};

DineIn.propTypes = { getRestaurantsByDineIn: PropTypes.func.isRequired };

const mapStateToProps = (state) => ({
  //   search: state.search,
});

export default connect(mapStateToProps, { getRestaurantsByDineIn })(DineIn);
