import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    Cust_email_id: '',
    Cust_Password: '',
  });
  const { Cust_email_id, Cust_Password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('SUCCESS');
    login(Cust_email_id, Cust_Password);
  };
  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-dark">Login</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Login yelp
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="Cust_email_id"
            value={Cust_email_id}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="Cust_Password"
            value={Cust_Password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-dark" value="Login" />
      </form>
      <p className="my-1">
        Dont have yelp account? <Link to="/signup">SignUp</Link>
      </p>
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

//redirecting on successful login
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
