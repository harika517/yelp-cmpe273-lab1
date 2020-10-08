import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItemDetailByID, editMenuItem } from '../../actions/restmenu';

//getItemDetailByID(item_id)
//get update action create after SQL worked
//editMenuItem(formData,item_id,history,edit = false)
const EditMenuItem = ({
  getItemDetailByID,
  editMenuItem,
  menu: { menuitem, loading },
  history,
  match,
}) => {
  const [formData, setFormData] = useState({
    item_name: '',
    item_description: '',
    item_category: '',
    item_ingredients: '',
    item_price: '',
    item_image: '',
    Rest_Name: '',
    Rest_email_id: '',
  });

  const {
    item_name,
    item_description,
    item_category,
    item_ingredients,
    item_price,
    item_image,
    Rest_Name,
    Rest_email_id,
  } = formData;

  if (menuitem) {
    console.log('Edit Menu', menuitem[0].item_name);
  }

  useEffect(() => {
    getItemDetailByID(match.params.item_id);
    setFormData({
      item_name: loading || !menuitem[0].item_name ? '' : menuitem[0].item_name,
      item_description:
        loading || !menuitem[0].item_description
          ? ''
          : menuitem[0].item_description,
      item_category:
        loading || !menuitem[0].item_category ? '' : menuitem[0].item_category,
      item_ingredients:
        loading || !menuitem[0].item_ingredients
          ? ''
          : menuitem[0].item_ingredients,
      item_price:
        loading || !menuitem[0].item_price ? '' : menuitem[0].item_price,
      item_image:
        loading || !menuitem[0].item_image ? '' : menuitem[0].item_image,
      Rest_Name: loading || !menuitem[0].Rest_Name ? '' : menuitem[0].Rest_Name,
      Rest_email_id:
        loading || !menuitem[0].Rest_email_id ? '' : menuitem[0].Rest_email_id,
    });
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (menuitem) {
      editMenuItem(formData, menuitem[0].item_id, history);
    }
  };

  return (
    <Fragment>
      <h1 className="large text-dark">Edit Menu Item</h1>
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
          <label for="item_image">Upload Image</label>
          <br />
          <input
            type="text"
            name="item_image"
            value={item_image}
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
            //onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Rest_email_id">Write to Us</label>
          <br />

          <input
            type="text"
            name="Rest_email_id"
            value={Rest_email_id}
            //onChange={(e) => onChange(e)}
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

EditMenuItem.propTypes = {
  getItemDetailByID: PropTypes.func.isRequired,
  editMenuItem: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  menu: state.menu,
});

export default connect(mapStateToProps, { getItemDetailByID, editMenuItem })(
  withRouter(EditMenuItem)
);
