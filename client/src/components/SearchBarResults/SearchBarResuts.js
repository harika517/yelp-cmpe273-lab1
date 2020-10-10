import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRestaurantsByInputText } from '../../actions/search';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

//getRestaurantsByInputText(input_text)

const SearchBarResuts = ({
  match,
  getRestaurantsByInputText,
  search: { searchresults, loading },
}) => {
  console.log('Insisd Searchbar Results', match.params.search);
  useEffect(() => {
    getRestaurantsByInputText(match.params.search);
  }, []);

  if (loading) {
    console.log('search results', searchresults.result1);
  }

  const arrobj = searchresults ? searchresults.result1 : null;

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
    <div>
      <Fragment>
        <h1 className="bold text-dark"> Restaurants </h1> <hr />{' '}
        {arrobj ? (
          arrobj.map((item) => (
            <div>
              <h4 className="bold text-dark"> {item.Rest_Name} </h4>{' '}
              <p className="medium"> Location: {item.Rest_location} </p>{' '}
              <p className="medium"> Email Id: {item.Rest_email_id} </p>{' '}
              <p className="medium"> Cuisine: {item.Cuisine} </p>{' '}
              <p className="medium"> Dine In: {item.Dine_In} </p>{' '}
              <p className="medium"> Delivery: {item.Yelp_Delivery} </p>{' '}
              <p className="medium">
                {' '}
                Curbside Pickup: {item.Curbside_PickUp}{' '}
              </p>{' '}
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
      </Fragment>{' '}
    </div>
  );
  //    <div>search bar results here</div>;
};

SearchBarResuts.propTypes = {
  getRestaurantsByInputText: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps, { getRestaurantsByInputText })(
  SearchBarResuts
);
