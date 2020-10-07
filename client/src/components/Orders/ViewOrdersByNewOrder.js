import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrdersByStatus, getOrdersByRestName } from '../../actions/orders';

//getOrdersByStatus(order_status)

const ViewOrdersByNewOrder = ({
  getOrdersByRestName,
  getOrdersByStatus,
  order: {
    orders: { result },
    loading,
  },
  match,
}) => {
  if (!loading) {
    console.log('Viewordersbystatus', result);
  }
  match.params.order_status = 'New Order';
  useEffect(() => {
    getOrdersByRestName();
    getOrdersByStatus(match.params.order_status);
  }, []);
  return <div>Bring in orders by order status</div>;
};

ViewOrdersByNewOrder.propTypes = {
  getOrdersByStatus: PropTypes.func.isRequired,
  getOrdersByRestName: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps, {
  getOrdersByStatus,
  getOrdersByRestName,
})(ViewOrdersByNewOrder);
