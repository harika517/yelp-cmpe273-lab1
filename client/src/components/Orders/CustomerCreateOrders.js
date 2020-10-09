import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createOrder } from '../../actions/orders';
import { getItemDetailByID } from '../../actions/restmenu';
import { getCurrentProfile } from '../../actions/profile';

// getItemDetailByID(item_id)
//getcurrentprofile
const CustomerCreateOrders = ({
  createOrder,
  getItemDetailByID,
  getCurrentProfile,
  profile: { profile },
  menu: { menuitem, loading },
  match,
}) => {
  const [formData, setFormData] = useState({
    Cust_Name: '',
    Rest_Name: '',
    item_name: '',
    order_status: '',
    Mode_Of_Delivery: '',
  });

  useEffect(() => {
    getItemDetailByID(match.params.item_id);
    getCurrentProfile();
    setFormData({
      //Cust_Name: loading || !profile.Cust_Name ? '' : profile.Cust_Name,
      Rest_Name: loading || !menuitem[0].Rest_Name ? '' : menuitem[0].Rest_Name,
      item_name: loading || !menuitem[0].item_name ? '' : menuitem[0].item_name,
    });
  }, [loading]);

  const {
    Cust_Name,
    Rest_Name,
    item_name,
    order_status,
    Mode_Of_Delivery,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createOrder(formData);
  };
  return (
    <Fragment>
      <div>Build a form to place a order</div>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label for="Cust_Name">Name</label>
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="Cust_Name"
            value={Cust_Name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Rest_Name">Restaurant Name</label>
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="Rest_Name"
            value={Rest_Name}
            //onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="item_name">Add Item</label>
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="item_name"
            value={item_name}
            //onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Mode_Of_Delivery">Choose Delivery Mode</label>
          <small className="form-text">This field is required.</small>
          <select
            name="Mode_Of_Delivery"
            id="Mode_Of_Delivery"
            onChange={(e) => onChange(e)}
          >
            <option value="none" selected>
              none
            </option>
            <option value="Delivery">Delivery</option>
            <option value="Pick Up">Pick Up</option>
          </select>
        </div>
        <input type="submit" className="btn btn-dark my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Cancel
        </a>
      </form>
    </Fragment>
  );
};

CustomerCreateOrders.propTypes = {
  createOrder: PropTypes.func.isRequired,
  getItemDetailByID: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  menu: state.menu,
});

export default connect(mapStateToProps, {
  createOrder,
  getItemDetailByID,
  getCurrentProfile,
})(CustomerCreateOrders);
