import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getOrdersByCustName } from '../../actions/orders';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { getCurrentProfile } from '../../actions/profile';
//order history
//getOrdersByCustName(Cust_Name)
const CustomerViewOrders = ({
  getCurrentProfile,
  getOrdersByCustName,
  order: { orders, loading },
  profile: { profile },
  match,
}) => {
  if (profile) {
    console.log('customer view orders', profile.Cust_Name);
  }
  useEffect(() => {
    getCurrentProfile();
    getOrdersByCustName(match.params.Cust_Name);
  }, []);
  console.log('Customer placed orders', orders.result);

  const [formData, setFormData] = useState({
    search: '',
  });

  const { search } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <div>
        {/* <Link to={`/ordersplaced/${match.params.Cust_Name}/${Order Received})`}>
          </Link> */}
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label for="search">Filter by order status</label>
            <select name="search" onChange={(e) => onChange(e)}>
              <option value="All">All</option>
              <option value="New Order">Order Received</option>
              <option value="Preparing">Preparing</option>
              <option value="On the way">On the way</option>
              <option value="Delivered">Delivered</option>
              <option value="Pick Up Ready">Pick Up Ready</option>
              <option value="Picked Up">Picked Up</option>
            </select>
            {/* <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => onChange(e)}
            /> */}
          </div>
          {profile ? (
            <Link
              to={`/ordersplaced/${profile.Cust_Name}/${search}`}
              className="btn btn-dark"
            >
              Go
            </Link>
          ) : (
            'none'
          )}
          <Link to={`/dashboard`} className="btn btn-dark">
            Go Back
          </Link>
        </form>
        <Table>
          <thead>
            <tr>
              <th className="medium bold">Order Id</th>
              <th className="medium bold">Customer Name</th>
              <th className="medium bold">Item Name</th>
              <th className="medium bold">Order Status</th>
              <th className="medium bold">Mode Of Delivery</th>
              <th className="medium bold">Date</th>
              {/* <th className="medium bold"></th> */}
            </tr>
          </thead>
        </Table>
        {orders.result ? (
          orders.result.map((item) => {
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
        ) : (
          <h2 className="text-dark bold medium">OOPS!! NO Orders found</h2>
        )}
      </div>
    </Fragment>
  );
};

CustomerViewOrders.propTypes = {
  getOrdersByCustName: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getOrdersByCustName,
  getCurrentProfile,
})(CustomerViewOrders);
