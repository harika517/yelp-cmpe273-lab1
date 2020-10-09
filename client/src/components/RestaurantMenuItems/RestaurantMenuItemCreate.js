import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createRestaurantMenuItem } from '../../actions/restmenu';

//RestaurantMenuItemCreate
const RestaurantMenuItemCreate = ({
  createRestaurantMenuItem,
  history,
  match,
}) => {
  const [formData, setFormData] = useState({
    item_name: '',
    item_description: '',
    item_category: '',
    item_ingredients: '',
    item_price: '',
    Rest_Name: '',
    Rest_email_id: '',
    item_image: '',
    Rest_Id_signup: '',
  });

  const {
    item_name,
    item_description,
    item_category,
    item_ingredients,
    item_price,
    Rest_Name,
    Rest_email_id,
    item_image,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createRestaurantMenuItem(formData, match.params.Rest_Id_signup, history);
  };
  return (
    <Fragment>
      <h1 className="large text-dark">Adding a Menu Item</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label for="item_name">Name</label>
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="item_name"
            value={item_name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="item_description">Description</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="item_description"
            value={item_description}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="item_category">Category</label>
          <br />
          <small className="form-text">
            Something Like "Salads and soups" or "Starters" or "Entree" etc.,
          </small>
          <input
            type="text"
            name="item_category"
            value={item_category}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="item_ingredients">Ingrediants</label>
          <br />
          <small className="form-text">What is it made of</small>
          <input
            type="text"
            name="item_ingredients"
            value={item_ingredients}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="item_price">Price</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="item_price"
            value={item_price}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Rest_Name">Restaurant Name</label>
          <br />
          <input
            type="text"
            name="Rest_Name"
            value={Rest_Name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Rest_email_id">Write to Us</label>
          <br />

          <input
            type="text"
            name="Rest_email_id"
            value={Rest_email_id}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="item_image">Upload Image</label>
          <br />

          <input
            type="text"
            name="item_image"
            value={item_image}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-dark my-1" />
        <Link className="btn btn-light my-1" to="/restaurant/menu">
          Cancel
        </Link>
      </form>
    </Fragment>
  );
};

RestaurantMenuItemCreate.propTypes = {
  createRestaurantMenuItem: PropTypes.func.isRequired,
};

export default connect(null, { createRestaurantMenuItem })(
  withRouter(RestaurantMenuItemCreate)
);
