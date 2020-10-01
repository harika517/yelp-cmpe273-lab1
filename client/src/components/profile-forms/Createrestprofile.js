import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createRestProfile } from '../../actions/profile';

//createProfile=createRestProfile
//Createprofile = Createrestprofile

const Createrestprofile = ({ createRestProfile, history }) => {
  const [formData, setFormData] = useState({
    Rest_Name,
    Description: '',
    Contact: '',
    Timings: '',
  });

  const { Rest_Name, Description, Contact, Timings } = formData;

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
          <label for="Description">Description</label>
          <small className="form-text">This field is required.</small>
          <input
            type="text"
            name="Description"
            value={Description}
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
          <label for="Timings">Timings</label>
          <br />
          <small className="form-text">
            The Boss, Calamity Jane, The Profilic Reviewer
          </small>
          <input
            type="text"
            name="Timings"
            value={Timings}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type="submit" className="btn btn-dark my-1" />
        <a className="btn btn-light my-1" href="restaurantdashboard.html">
          Cancel
        </a>
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
