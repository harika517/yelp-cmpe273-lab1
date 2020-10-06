import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrdersByOrdeId } from '../../actions/orders';
// need get order by id
//getOrdersByOrdeId(order_id)
const RestaurantUpdateOrder = ({ match, getOrdersByOrdeId }) => {
  useEffect(() => {
    getOrdersByOrdeId(match.params.order_id);
  });
  return <div>update order here</div>;
};

RestaurantUpdateOrder.propTypes = {
  getOrdersByOrdeId: PropTypes.func.isRequired,
};

export default connect(null, { getOrdersByOrdeId })(RestaurantUpdateOrder);
