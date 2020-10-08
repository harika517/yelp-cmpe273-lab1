import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItemDetailByID } from '../../actions/restmenu';

//getItemDetailByID(item_id)
const EditMenuItem = ({ getItemDetailByID, history, match }) => {
  useEffect(() => {
    getItemDetailByID(match.params.item_id);
  });
  return <div> edit menu here</div>;
};

EditMenuItem.propTypes = {
  getItemDetailByID: PropTypes.func.isRequired,
};

// const mapStateToProps = (state = {});

export default connect(null, { getItemDetailByID })(withRouter(EditMenuItem));
