import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { signupRestaurantUser } from '../../actions/auth';
import PropTypes from 'prop-types';

const SignUpRestaurant = ({ signupRestaurantUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    Rest_Name: '',
    Rest_email_id: '',
    Rest_Password: '',
    Rest_location: '',
  });
  const { Rest_Name, Rest_email_id, Rest_Password, Rest_location } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //console.log(Cust_Name, Cust_email_id, Cust_Password);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('success', formData);
    signupRestaurantUser({
      Rest_Name,
      Rest_email_id,
      Rest_Password,
      Rest_location,
    });
  };
  if (isAuthenticated) {
    return <Redirect to="/restaurantdashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-dark">Restaurant Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create your restaurant account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="Rest_Name"
            defaultValue={Rest_Name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="Rest_email_id"
            defaultValue={Rest_email_id}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="Rest_Password"
            defaultValue={Rest_Password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="Rest_location"
            defaultValue={Rest_location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-dark" value="SignUp" />
      </form>
      {/* <p className="my-1">
    Already on yelp? <Link to="/login">Sign In</Link>
  </p> */}
    </Fragment>
  );
};

SignUpRestaurant.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signupRestaurantUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

//redirecting on successful login
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, signupRestaurantUser })(
  SignUpRestaurant
);
