import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createRestProfile } from '../../actions/profile';

//createProfile=createRestProfile
//Createprofile = Createrestprofile

const Createrestprofile = ({ createRestProfile, history }) => {
  const [formData, setFormData] = useState({
    Rest_Name: '',
    Rest_email_id: '',
    Rest_location: '',
    Description: '',
    Contact: '',
    Timings: '',
    Curbside_PickUp: '',
    Dine_In: '',
    Yelp_Delivery: '',
  });

  const {
    Rest_Name,
    Rest_email_id,
    Rest_location,
    Description,
    Contact,
    Timings,
    Curbside_PickUp,
    Dine_In,
    Yelp_Delivery,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createRestProfile(formData, history);
  };
  return (
    <Fragment>
      <h1 className="large text-dark">Create Profile</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label for="Rest_Name">Restaurant Name</label>
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="Rest_Name"
            value={Rest_Name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Rest_email_id">Restaurant Email Id</label>
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="Rest_email_id"
            value={Rest_email_id}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Contact">Contact</label>
          <br />
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="Contact"
            value={Contact}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Rest_location">Location</label>
          <br />
          <small className="form-text">Address of the restaurant.</small>
          <input
            type="text"
            name="Rest_location"
            value={Rest_location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Description">Description</label>
          <small className="form-text">
            Describe your restaurant in few words.
          </small>
          <textarea
            rows="4"
            cols="50"
            type="text"
            name="Description"
            value={Description}
            onChange={(e) => onChange(e)}
          >
            {' '}
            {Description}{' '}
          </textarea>
        </div>

        <div className="form-group">
          <label for="Timings">Timings</label>
          <br />
          <small className="form-text">Restaurant Timings</small>
          <input
            type="text"
            name="Timings"
            value={Timings}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Curbside_PickUp">Curbside PickUp</label>
          <br />
          <small className="form-text">Say yes or no</small>
          <input
            type="text"
            name="Curbside_PickUp"
            value={Curbside_PickUp}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Dine_In">Dine In</label>
          <br />
          <small className="form-text">Say yes or no</small>
          <input
            type="text"
            name="Dine_In"
            value={Dine_In}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="Yelp_Delivery">Yelp Delivery</label>
          <br />
          <small className="form-text">Say yes or no</small>
          <input
            type="text"
            name="Yelp_Delivery"
            value={Yelp_Delivery}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type="submit" className="btn btn-dark my-1" />
        <Link className="btn btn-light my-1" to="/restaurantdashboard">
          Cancel
        </Link>
      </form>
    </Fragment>
  );
};

Createrestprofile.propTypes = {
  createRestProfile: PropTypes.func.isRequired,
};

export default connect(null, { createRestProfile })(
  withRouter(Createrestprofile)
);
