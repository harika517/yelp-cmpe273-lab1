import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getOrdersByRestName,
  updateOrdersByOrderId,
} from '../../actions/orders';
import Table from 'react-bootstrap/Table';
//updateOrdersByOrderId(formData)
const RestaurantViewOrders = ({
  getOrdersByRestName,
  updateOrdersByOrderId,
  auth,
  order: { orders },
}) => {
  const [formData, setFormData] = useState({
    order_status: '',
    Mode_Of_Delivery: '',
  });
  useEffect(() => {
    getOrdersByRestName();
    // setFormData({
    //   order_status:
    //     'New Order' ||
    //     'Order Received' ||
    //     'Preparing' ||
    //     'Delivered' ||
    //     'Cancelled',
    //   Mode_Of_Delivery:
    //     'Pick Up' ||
    //     'Pick Up Ready' ||
    //     'Picked Up' ||
    //     'Delivery' ||
    //     'On the way' ||
    //     'Delivered',
    // });
  }, []);

  const { Mode_Of_Delivery, order_id } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // updateOrdersByOrderId();
  };

  orders ? console.log('print orders', orders) : console.log('no orders');
  let opt = new Array();

  if (orders) {
    return (
      <Fragment>
        <div>
          <p className="large bold text-dark">Customer Orders</p>
          <Link to="/restaurantdashboard" className="btn btn-dark">
            Go Back
          </Link>
          <hr></hr>
          {/* {orders.result
          ? orders.result.map((item) => 
          <div> */}
          {console.log('reached rendering orders')}
          {orders.result
            ? console.log('orders.result is ', orders.result)
            : console.log('no orders.result')}
          <Table>
            <thead>
              <tr>
                <th className="medium bold">Order Id</th>
                <th className="medium bold">Customer Name</th>
                <th className="medium bold">Item Name</th>
                <th className="medium bold">
                  <select>
                    <option selected="selected" value="Order Id">
                      Order Status
                    </option>
                    <option name="order_status" value="order_status">
                      New Order
                    </option>
                    <option name="order_status" value="order_status">
                      Order Received
                    </option>
                    <option name="order_status" value="order_status">
                      Preparing
                    </option>
                    <option name="order_status" value="order_status">
                      Delivered
                    </option>
                    <option name="order_status" value="order_status">
                      Cancelled
                    </option>
                  </select>
                </th>
                <th className="medium bold">
                  <select>
                    <option selected="selected" value="Order Id">
                      Mode Of Delivery
                    </option>
                    <option name="Mode_Of_Delivery" value="Mode_Of_Delivery">
                      On the way
                    </option>
                    <option name="Mode_Of_Delivery" value="Mode_Of_Delivery">
                      Delivered
                    </option>
                    <option name="Mode_Of_Delivery" value="Mode_Of_Delivery">
                      Pick Up Ready{' '}
                    </option>
                    <option name="Mode_Of_Delivery" value="Mode_Of_Delivery">
                      Picked Up
                    </option>
                  </select>
                </th>
                <th className="medium bold"></th>
              </tr>
            </thead>
          </Table>
          {orders.result
            ? orders.result.map(
                (item) => {
                  return (
                    <Table>
                      {console.log('item order id is ', item.order_id)}
                      <tbody>
                        <tr key={item.order_id} className="medium">
                          <td
                            className="medium"
                            name="order_id"
                            value="order_id"
                          >
                            <Link
                              to={`/orders/update/${item.order_id}`}
                              className="medium text-primary"
                            >
                              {item.order_id}
                            </Link>
                          </td>
                          <td value="Cust_Name" name="Cust_Name">
                            <Link
                              to={`/orders/${item.Cust_Name}`}
                              className="medium text-dark"
                            >
                              {item.Cust_Name}
                            </Link>
                          </td>
                          <td
                            className="medium"
                            name="item_name"
                            value="item_name"
                          >
                            {item.item_name}
                          </td>
                          <td className="medium">
                            <select onChange={(e) => onChange(e)}>
                              <option selected="selected" value="order_status">
                                {item.order_status}
                              </option>
                              <option name="order_status" value="order_status">
                                Order Received
                              </option>
                              <option name="order_status" value="order_status">
                                Preparing
                              </option>
                              <option name="order_status" value="Delivered">
                                Delivered
                              </option>
                              <option name="order_status" value="Cancelled">
                                Cancelled
                              </option>
                            </select>
                          </td>
                          <td className="medium">
                            <select onChange={(e) => onChange(e)}>
                              <option
                                selected="selected"
                                value="Mode_Of_Delivery"
                              >
                                {item.Mode_Of_Delivery}
                              </option>
                              {item.Mode_Of_Delivery == 'Delivery'
                                ? (opt = ['On the way', 'Delivered'])
                                : (opt = ['Pick Up Ready', 'Picked Up'])}
                              {opt.map((item) => (
                                <option value="Mode_Of_Delivery">{item}</option>
                              ))}
                              {/* <option value="Mode_Of_Delivery">On the way</option>
                            <option value="Mode_Of_Delivery">Delivered</option>
                            <option value="Mode_Of_Delivery">Pick Up Ready</option>
                            <option value="Mode_Of_Delivery">Picked Up</option> */}
                            </select>
                          </td>
                          {/* <td>
                            <input type="submit">Update</input>
                          </td> */}
                          {/* <td>
                            <input
                              type="submit"
                              className="btn btn-dark"
                              onSubmit={(e) => onSubmit(e)}
                            >
                              Update
                            </input>
                          </td> */}
                        </tr>
                      </tbody>
                    </Table>
                  );
                }
                //   </div>
              )
            : 'none'}
        </div>
      </Fragment>
    );
  } else {
    return null;
  }
};

RestaurantViewOrders.propTypes = {
  getOrdersByRestName: PropTypes.func.isRequired,
  //   updateOrdersByOrderId: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order,
  // profile: state.profile,
  // review: state.review,
});

export default connect(mapStateToProps, {
  getOrdersByRestName,
  updateOrdersByOrderId,
})(RestaurantViewOrders);
