import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllRestProfiles, getCurrentProfile } from '../../actions/profile';

const ViewRestaurantsDashboard = ({
  getAllRestProfiles,
  getCurrentProfile,
  // profile: { profiles },
  restprofile: { rest_profiles },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getAllRestProfiles();
  }, []);

  console.log('inside Reviews, ', rest_profiles);
  const arrobj = rest_profiles ? rest_profiles.result : null;

  return (
    <div>
      <Fragment>
        <h1 className="bold text-dark"> Restaurants</h1>
        <hr />
        {arrobj
          ? arrobj.map((item) => (
              <div>
                <h4 className="bold text-dark">{item.Rest_Name}</h4>
                <p className="medium"> {item.Rest_location}</p>
                <p className="medium"> {item.Contact}</p>
                <p className="medium"> {item.Timings}</p>
                <p className="medium"> {item.Description}</p>
                <Link
                  to={`/viewrestaurantpage/${item.Rest_Id_signup}`}
                  className="btn btn-dark"
                >
                  View Restaurant Page
                </Link>
                <Link
                  to={`/writecustomerreview/${item.Rest_Id_signup}`}
                  className="btn btn-primary"
                >
                  Write a Review
                </Link>
                <hr />
              </div>
            ))
          : 'none'}
      </Fragment>
    </div>
  );
};

ViewRestaurantsDashboard.propTypes = {
  getAllRestProfiles: PropTypes.func.isRequired,
  restprofile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  restprofile: state.restprofile,
});

export default connect(mapStateToProps, {
  getAllRestProfiles,
  getCurrentProfile,
})(ViewRestaurantsDashboard);
