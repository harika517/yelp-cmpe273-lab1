import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginRestaurantUser } from '../../actions/auth';

const LoginRestaurant = ({ loginRestaurantUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    Rest_email_id: '',
    Rest_Password: '',
  });
  const { Rest_email_id, Rest_Password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('SUCCESS');
    loginRestaurantUser(Rest_email_id, Rest_Password);
  };
  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/restaurantdashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-dark"> Restaurant Login</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Login to your restaurant account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="Rest_email_id"
            value={Rest_email_id}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="Rest_Password"
            value={Rest_Password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-dark" value="Login" />
      </form>
      <p className="my-1">
        Dont have yelp account?{' '}
        <Link to="/restaurants/signup" className="text-dark">
          SignUp
        </Link>
      </p>
    </Fragment>
  );
};

LoginRestaurant.propTypes = {
  loginRestaurantUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

//redirecting on successful login
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { loginRestaurantUser })(
  LoginRestaurant
);
