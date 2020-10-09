import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getOrdersByCustName } from '../../actions/orders';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
//order history
//getOrdersByCustName(Cust_Name)
const CustomerViewOrders = ({
  getOrdersByCustName,
  order: { orders, loading },
  match,
}) => {
  useEffect(() => {
    getOrdersByCustName(match.params.Cust_Name);
  }, []);
  console.log('Customer placed orders', orders.result);
  return (
    <Fragment>
      <div>
        {/* <Link to={`/ordersplaced/${match.params.Cust_Name}/${Order Received})`}>
          </Link> */}
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
                    Pick Up Ready
                  </option>
                  <option name="Mode_Of_Delivery" value="Mode_Of_Delivery">
                    Picked Up
                  </option>
                </select>
              </th>
              <th className="medium bold">Date</th>
              {/* <th className="medium bold"></th> */}
            </tr>
          </thead>
        </Table>
        {orders.result
          ? orders.result.map((item) => {
              return (
                <Table>
                  {console.log('item order id is ', item.order_id)}
                  <tbody>
                    <tr key={item.order_id} className="medium">
                      <td className="medium" name="order_id">
                        {item.order_id}
                      </td>
                      <td value={item.Cust_Name} name="Cust_Name">
                        {item.Cust_Name}
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
                      <td className="medium" name="Date">
                        {' '}
                        {item.Date}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              );
            })
          : 'none'}
      </div>
    </Fragment>
  );
};

CustomerViewOrders.propTypes = {
  getOrdersByCustName: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps, { getOrdersByCustName })(
  CustomerViewOrders
);
