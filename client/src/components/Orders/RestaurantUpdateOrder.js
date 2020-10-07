import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getOrdersByOrderId,
  updateOrdersByOrderId,
} from '../../actions/orders';
// need get order by id
//getOrdersByOrdeId(order_id)
//updateOrdersByOrderId (formdata, order_id, history)
const RestaurantUpdateOrder = ({
  match,
  getOrdersByOrderId,
  updateOrdersByOrderId,
  order: { order, loading },
  history,
}) => {
  const [formData, setFormData] = useState({
    order_id: '',
    Cust_Name: '',
    Rest_Name: '',
    item_name: '',
    order_status: '',
    Mode_Of_Delivery: '',
    Rest_email_id: '',
  });
  if (order) {
    console.log('Getorderbyid', order.Cust_Name);
  }

  console.log('order id to check is ', match.params.order_id);

  useEffect(() => {
    getOrdersByOrderId(match.params.order_id);
    console.log('order is ', order);
    setFormData({
      order_id: loading || !order.order_id ? '' : order.order_id,
      Cust_Name: loading || !order.Cust_Name ? '' : order.Cust_Name,
      Rest_Name: loading || !order.Rest_Name ? '' : order.Rest_Name,
      item_name: loading || !order.item_name ? '' : order.item_name,
      order_status: loading || !order.order_status ? '' : order.order_status,
      Mode_Of_Delivery:
        loading || !order.Mode_Of_Delivery ? '' : order.Mode_Of_Delivery,
      Rest_email_id: loading || !order.Rest_email_id ? '' : order.Rest_email_id,
    });
    console.log('inside useEffect, seting formdata, formdata is now', formData);
  }, [loading]);

  const {
    order_id,
    Cust_Name,
    Rest_Name,
    item_name,
    order_status,
    Mode_Of_Delivery,
    Rest_email_id,
  } = formData;

  let opt = new Array();
  const onChange = (e) => {
    console.log('inside onChange, before change formData is', formData);
    console.log(
      'inside onChange, e.target.name and e.target.value are',
      e.target.name,
      e.target.value
    );
    //debugger;
    // setFormData({
    //   ...formData,
    //   order_status: e.target.name ? e.target.value : null,
    // });
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log('inside onChange, after change formData is', formData);
    //debugger;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('update order', match.params.order_id);
    console.log('inside onSubmit, formdata is', formData);
    updateOrdersByOrderId(formData, match.params.order_id, history);
  };
  return (
    <Fragment>
      <h1 className="large text-dark"> Update Order </h1>{' '}
      {console.log('before clicking onSubmit, in orders update,')}
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label for="order_id"> Order Id </label>{' '}
          <input
            type="text"
            name="order_id"
            value={order_id}
            // onChange={(e) => onChange(e)}
          />{' '}
        </div>{' '}
        <div className="form-group">
          <label for="Cust_Name"> Customer Name </label>{' '}
          <input
            type="text"
            name="Cust_Name"
            value={Cust_Name}
            // onChange={(e) => onChange(e)}
          />{' '}
        </div>{' '}
        <div className="form-group">
          <label for="Rest_Name"> Restaurant Name </label>{' '}
          <input
            type="text"
            name="Rest_Name"
            value={Rest_Name}
            // onChange={(e) => onChange(e)}
          />{' '}
        </div>{' '}
        <div className="form-group">
          <label for="item_name"> Ordered Items </label>{' '}
          <input
            type="text"
            name="item_name"
            value={item_name}
            // onChange={(e) => onChange(e)}
          />{' '}
        </div>{' '}
        <div className="form-group">
          <label for="order_status"> Order Status </label>{' '}
          <select
            name="order_status"
            selected={order_status}
            onChange={(e) => onChange(e)}
          >
            <option value="Order Received">Order Received</option>
            <option value="Preparing">Preparing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          {/* <input
                        type="text"
                        name="order_status"
                        value={order_status}
                        onChange={(e) => onChange(e)}
                      /> */}{' '}
        </div>{' '}
        <div className="form-group">
          <label for="Mode_Of_Delivery"> Mode Of Delivery </label>{' '}
          <select name="Mode_Of_Delivery" onChange={(e) => onChange(e)}>
            <option value="Pick Up">Pick Up</option>
            <option value="Pick Up Ready">Pick Up Ready</option>
            <option value="Picked Up">Picked Up</option>
          </select>
          {/* <label for="Mode_Of_Delivery"> Delivery Mode </label>{' '}
          <select onChange={(e) => onChange(e)}>
            <option selected="selected" value={Mode_Of_Delivery}>
              {' '}
              {Mode_Of_Delivery}{' '}
            </option>{' '}
            {Mode_Of_Delivery == 'Delivery'
              ? (opt = ['On the way', 'Delivered'])
              : (opt = ['Pick Up Ready', 'Picked Up'])}{' '}
            {opt.map((item) => (
              <option value="Mode_Of_Delivery"> {item} </option>
            ))}{' '}
          </select>{' '} */}
          {/* <input
                        type="text"
                        name="Mode_Of_Delivery"
                        value={Mode_Of_Delivery}
                        onChange={(e) => onChange(e)}
                      /> */}{' '}
        </div>{' '}
        <div className="form-group">
          <label for="Rest_email_id"> Email Id </label>{' '}
          <input
            type="text"
            name="Rest_email_id"
            value={Rest_email_id}
            // onChange={(e) => onChange(e)}
          />{' '}
        </div>{' '}
        <input type="submit" className="btn btn-dark my-1" />
        <Link
          className="btn btn-light my-1"
          to={`/restaurant/orders/${Rest_Name}`}
        >
          Cancel{' '}
        </Link>{' '}
      </form>{' '}
    </Fragment>
  );
};

RestaurantUpdateOrder.propTypes = {
  getOrdersByOrdeId: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  updateOrdersByOrderId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps, {
  getOrdersByOrderId,
  updateOrdersByOrderId,
})(withRouter(RestaurantUpdateOrder));
