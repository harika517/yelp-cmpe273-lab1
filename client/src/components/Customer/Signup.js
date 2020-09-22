import React, { Fragment, useState } from 'react';
//import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { signup } from '../../actions/auth';
import PropTypes from 'prop-types';

const Signup = ({ setAlert, signup }) => {
  const [formData, setFormData] = useState({
    Cust_Name: '',
    Cust_email_id: '',
    Cust_Password: '',
  });
  const { Cust_Name, Cust_email_id, Cust_Password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //console.log(Cust_Name, Cust_email_id, Cust_Password);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //if (Cust_Password !== '123456') {
    //setAlert('Please enter 123456 as password');
    //setAlert('Please enter 123456 as password', 'danger');
    //} else {
    //const newUser = { Cust_Name, Cust_email_id, Cust_Password };
    console.log('success', formData);
    signup({ Cust_Name, Cust_email_id, Cust_Password });
    // try {
    //   const config = {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   };
    //   const body = JSON.stringify(newUser);
    //   const res = await axios.post(
    //     'http://localhost:3001/customer/signUP',
    //     body,
    //     config
    //   );
    //   console.log(res.data);
    // } catch (err) {
    //   console.error(err.response.data);
    // }
    // }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Up for Yelp
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="Cust_Name"
            defaultValue={Cust_Name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="Cust_email_id"
            defaultValue={Cust_email_id}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="Cust_Password"
            defaultValue={Cust_Password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="SignUp" />
      </form>
      <p className="my-1">
        Already on yelp? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, signup })(Signup);
