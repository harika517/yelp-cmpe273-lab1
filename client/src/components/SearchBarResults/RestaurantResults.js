import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllRestProfiles } from '../../actions/profile';

const RestaurantResults = ({
  getAllRestProfiles,
  restprofile: { rest_profiles },
}) => {
  useEffect(() => {
    getAllRestProfiles();
  }, []);

  const arrobj = rest_profiles ? rest_profiles.result : null;

  return (
    <Fragment>
      <h1 className="bold text-dark"> Restaurants</h1>
      <hr />
      {arrobj ? (
        arrobj.map((item) => (
          <div>
            <h4 className="bold text-dark">{item.Rest_Name}</h4>
            <p className="medium"> {item.Rest_location}</p>
            <p className="medium"> {item.Contact}</p>
            <p className="medium"> {item.Timings}</p>
            <p className="medium"> {item.Description}</p>
            <Link
              to={`/restaurantresults/${item.Rest_Id_signup}`}
              className="btn btn-dark"
            >
              View Restaurant Page
            </Link>
            <hr />
          </div>
        ))
      ) : (
        <h4 className="bold text-dark">'OOPS.. No Resturants found'</h4>
      )}
    </Fragment>
  );
};

RestaurantResults.propTypes = {
  getAllRestProfiles: PropTypes.func.isRequired,
  restprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  restprofile: state.restprofile,
});

export default connect(mapStateToProps, { getAllRestProfiles })(
  RestaurantResults
);
