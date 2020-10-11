import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllRestProfiles } from '../../actions/profile';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const RestaurantResults = ({
  getAllRestProfiles,
  restprofile: { rest_profiles },
}) => {
  useEffect(() => {
    getAllRestProfiles();
  }, []);

  const arrobj = rest_profiles ? rest_profiles.result : null;

  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 37.35239,
    lng: -121.953079,
  };
  let location = { lat: 41.3851, lng: 2.1734 };

  return (
    <Fragment>
      <div>
        <h1 className="bold text-dark"> Restaurants </h1> <hr />{' '}
        {arrobj ? (
          arrobj.map((item) => (
            <div>
              <h4 className="bold text-dark"> {item.Rest_Name} </h4>{' '}
              <p className="medium"> {item.Rest_location} </p>{' '}
              <p className="medium"> {item.Contact} </p>{' '}
              <p className="medium"> {item.Timings} </p>{' '}
              <p className="medium"> {item.Description} </p>{' '}
              <Link
                to={`/restaurantresults/${item.Rest_Id_signup}`}
                className="btn btn-dark"
              >
                View Restaurant Page{' '}
              </Link>{' '}
              <hr />
            </div>
          ))
        ) : (
          <h4 className="bold text-dark"> 'OOPS.. No Resturants found' </h4>
        )}{' '}
      </div>{' '}
      <div className="column2maps">
        <LoadScript googleMapsApiKey="AIzaSyBaWrNiyni5r6dlgNfuz9IpMNFyumFTI0s">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
          >
            {arrobj
              ? arrobj.map((item) => {
                  location = {
                    lat: parseFloat(item.lat),
                    lng: parseFloat(item.lng),
                  };
                  console.log('location is', location);
                  return <Marker key={item.Rest_Name} position={location} />;
                })
              : null}{' '}
          </GoogleMap>{' '}
        </LoadScript>{' '}
      </div>{' '}
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
