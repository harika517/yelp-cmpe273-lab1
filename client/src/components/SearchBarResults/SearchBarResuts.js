import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRestaurantsByInputText } from '../../actions/search';
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
    console.log('search results', searchresults.result);
  }

  const arrobj = searchresults ? searchresults.result : null;

  return (
    <div>
      <Fragment>
        <h1 className="bold text-dark"> Restaurants</h1>
        <hr />
        {arrobj ? (
          arrobj.map((item) => (
            <div>
              <h4 className="bold text-dark">{item.Rest_Name}</h4>
              <p className="medium"> {item.Rest_location}</p>
              <p className="medium"> {item.Rest_email_id}</p>
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
          <h4 className="bold text-dark">
            'OOPS.. No Resturants found with this Criteria'
          </h4>
        )}
      </Fragment>
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
