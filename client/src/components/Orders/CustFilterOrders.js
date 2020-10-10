import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getCustOrderByStatus } from '../../actions/orders';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';

const CustFilterOrders = ({
  getCustOrderByStatus,
  order: { orders, loading },
  match,
}) => {
  useEffect(() => {
    getCustOrderByStatus(match.params.Cust_Name, match.params.search);
  }, []);
  return (
    <Fragment>
      <div>
        <h3 className="text-dark medium bold">
          Orders Filtered by oreder Status
        </h3>
        <Table>
          <thead>
            <tr>
              <th className="medium bold">Order Id</th>
              <th className="medium bold">Customer Name</th>
              <th className="medium bold">Item Name</th>
              <th className="medium bold"> Order Status</th>
              <th className="medium bold">Mode Of Delivery</th>
              <th className="medium bold">Date</th>
            </tr>
          </thead>
        </Table>
        {orders.result ? (
          orders.result.map((item) => {
            return (
              <Table>
                {/* {console.log('item order id is ', item.order_id)} */}
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
        ) : (
          <h3 className="text-dark medium">No Orders found</h3>
        )}
      </div>
    </Fragment>
  );
};

CustFilterOrders.propTypes = {
  getCustOrderByStatus: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps, { getCustOrderByStatus })(
  CustFilterOrders
);
