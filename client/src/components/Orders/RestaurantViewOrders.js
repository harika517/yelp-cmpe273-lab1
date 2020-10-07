import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getOrdersByRestName,
  updateOrdersByOrderId,
  getOrdersByStatus,
} from '../../actions/orders';
import Table from 'react-bootstrap/Table';
//updateOrdersByOrderId(formData)
const RestaurantViewOrders = ({
  getOrdersByRestName,
  updateOrdersByOrderId,
  auth,
  order: { orders },
  match,
}) => {
  useEffect(() => {
    getOrdersByRestName();
  }, []);

  const [formData, setFormData] = useState({
    search_status: '',
  });

  const { search_status } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    getOrdersByStatus(match.params.order_status);
  };

  orders ? console.log('print orders', orders) : console.log('no orders');

  if (orders) {
    return (
      <Fragment>
        <div>
          <p className="large bold text-dark">Customer Orders</p>
          {/* {orders.result ? (
            <Fragment>
              <Link
                to={`/restaurant/orders/${orders.result[0].Rest_Name}/${orders.result[0].order_status}`}
                className="btn btn-dark"
              >
                New Order
              </Link>
              <Link
                to={`/restaurant/orders/${order_status}`}
                className="btn btn-dark"
              >
                Delivered Order
              </Link>
              <Link
                to={`/restaurant/orders/${order_status}`}
                className="btn btn-dark"
              >
                Cancelled Order
              </Link>
            </Fragment>
          ) : (
            'null'
          )} */}
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label for="search_status">Search by Order Status</label>
              <input
                type="text"
                name="search_status"
                value={search_status}
                onChange={(e) => onChange(e)}
              />
            </div>
            {orders.result ? (
              <Link
                to={`/restaurant/orders/${orders.result[0].Rest_Name}/${search_status}`}
                className="btn btn-dark"
              >
                Go
              </Link>
            ) : null}
          </form>
          {/* <Link
                to={`/restaurant/orders/${order.result.order_status}`}
                className="btn btn-dark"
              >
                
              </Link>
              <Link
                to={`/restaurant/orders/${order.result.order_status}`}
                className="btn btn-dark"
              >
                
              </Link> */}
          <Link to="/restaurantdashboard" className="btn btn-light">
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
                            value={item.order_id}
                          >
                            <Link
                              to={`/orders/update/${item.order_id}`}
                              className="medium text-primary"
                            >
                              {item.order_id}
                            </Link>
                          </td>
                          <td value={item.Cust_Name} name="Cust_Name">
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
                            value={item.item_name}
                          >
                            {item.item_name}
                          </td>
                          <td
                            className="medium"
                            name="order_status"
                            value={item.order_status}
                          >
                            {item.order_status}
                          </td>
                          <td
                            className="medium"
                            name="Mode_Of_Delivery"
                            value={item.Mode_Of_Delivery}
                          >
                            {item.Mode_Of_Delivery}
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
