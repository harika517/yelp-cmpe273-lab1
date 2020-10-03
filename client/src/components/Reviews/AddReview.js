import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReviews, getRestByName } from '../../actions/review';

//useState = formdata review
//actions = getRestByName(Rest_Name)
//actions = addReviews(formData, Rest_Name)
const AddReview = ({ addReviews, getRestByName, profile, match }) => {
  const [formData, setFormData] = useSate({ review: '' });

  //   useEffect(() => {
  //     getRestByName(match.params.Rest_Name);
  //     // addReviews(match.params.Rest_Name);
  //   }, []);
  const { review } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addReviews(formData, match.params.Rest_Name);
  };

  return <div>add review form</div>;
};

AddReview.propTypes = {
  addReviews: PropTypes.func.isRequired,
};

export default connect(null, { addReviews })(AddReview);
