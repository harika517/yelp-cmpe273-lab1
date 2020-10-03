import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllRestProfiles, getCurrentProfile } from '../../actions/profile';
import { RestaurantCard } from './RestaurantCard';

const Reviews = ({ getAllRestProfiles, profile: { profile } }) => {
  useEffect(() => {
    getAllRestProfiles();
  }, []);
  console.log('inside Reviews, ', profile);
  const arrobj = profile ? profile.result : null;

  // console.log(Rest_Name);
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
                  to={`/writereview/${item.Rest_Name}`}
                  className="bold text-primary medium"
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

Reviews.propTypes = {
  getAllRestProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllRestProfiles })(Reviews);
