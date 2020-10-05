import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addReviews, getRestByName } from '../../actions/review';

//useState = formdata review
//actions = getRestByName(Rest_Name)
//actions = addReviews(formData, Rest_Name)
const AddReview = ({ addReviews, history }) => {
  // useEffect(() => {
  //   getRestByName(match.params.Rest_Name);
  // }, []);
  const [formData, setFormData] = useState({
    Rest_Name: '',
    review: '',
    ratings: '',
  });

  const { Rest_Name, review, ratings } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // addReviews(formData, match.params.Rest_Name);
    addReviews(formData, history);
    // console.log('Add reviews', match.params.Rest_Name);
  };

  return (
    <Fragment>
      <h1 className="large text-dark">Add a review</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label for="Rest_Name">Restaurant</label>
          <input
            type="text"
            name="Rest_Name"
            value={Rest_Name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="ratings">Ratings</label>
          <small className="form-text">
            Please provide your ratings from 0 to 5
          </small>
          <input
            type="number"
            name="ratings"
            min="0"
            max="5"
            value={ratings}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="review">Add review</label>
          <small className="form-text">This field is required.</small>
          <textarea
            name="review"
            rows="4"
            cols="50"
            value={review}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-dark my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Cancel
        </Link>
      </form>
    </Fragment>
  );
};

AddReview.propTypes = {
  addReviews: PropTypes.func.isRequired,
  // getRestByName: PropTypes.func.isRequired,
};

export default connect(null, { addReviews })(withRouter(AddReview));
