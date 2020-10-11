import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRestaurantsByDelivery } from '../../actions/search';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
//getRestaurantsByDelivery

const CurbSidePickUp = ({
  getRestaurantsByDelivery,
  search: { searchresults },
}) => {
  useEffect(() => {
    getRestaurantsByDelivery();
  }, []);
  console.log('Search curbsidepickup', searchresults.result);
  // let revs = reviews.result;

  const arrobj = searchresults ? searchresults.result : null;

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
        <h4 className="bold text-dark">
          'OOPS.. No Resturants found with this Criteria'{' '}
        </h4>
      )}{' '}
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
      </div>
    </Fragment>
  );
};

CurbSidePickUp.propTypes = {
  getRestaurantsByDelivery: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps, { getRestaurantsByDelivery })(
  CurbSidePickUp
);
