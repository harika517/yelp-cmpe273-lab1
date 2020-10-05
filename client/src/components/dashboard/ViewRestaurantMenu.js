import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMenuByRestName } from '../../actions/restmenu';
import { Restaurantmenuitems } from '../RestaurantMenuItems/Restaurantmenuitems';
// import { getCurrentRestProfile } from '../../actions/profile';

const ViewRestaurantMenu = ({
  getMenuByRestName,
  profile: { profile },
  menu: { allmenuitems, loading },
  match,
}) => {
  useEffect(() => {
    getMenuByRestName(match.params.Rest_Name);
    // getCurrentRestProfile();
  }, []);
  if (allmenuitems) {
    console.log('Customer menu', allmenuitems[0]);
  }
  //

  let uniqCategories = allmenuitems.map((item) => item.item_category);
  uniqCategories = [...new Set(uniqCategories)];
  let newobj = {};
  uniqCategories.map((it) => {
    newobj[it] = allmenuitems.filter((el) => el.item_category === it);
  });
  console.log('inside rest menu items, new obj is ', newobj);
  console.log('inside rest menu items, unique categories, ', uniqCategories);

  return (
    <div>
      <Fragment>
        <h1 className="text-dark">
          {/* {allmenuitems ? allmenuitems[0].Rest_Name : ' '}{' '} */}
        </h1>
        <Link to="/viewrestaurants" className="btn btn-primary">
          {' '}
          Return to Restaurant Page
        </Link>{' '}
        {/* <Link to={`/placeorder/${Rest_Name}`} className="btn btn-dark">
          Build Your Order
        </Link> */}
        <br />
        <br />
        <hr></hr>
        {/* {allmenuitems
          ? allmenuitems.map((item) => (
              <p>
                {item.item_name} | {item.item_description} |{' '}
                {item.item_category} |{item.item_ingredients} |{' '}
                {item.item_price}
              </p>
            ))
          : 'none'} */}
        {newobj
          ? Object.keys(newobj).map((k, idx) => {
              return (
                <div>
                  <h3>{k}</h3>
                  {newobj[k].map((indi) => (
                    <div>
                      <p className="lead">{indi.item_name}</p>
                      <p className="medium">{indi.item_description}</p>
                      <p className="medium">
                        Ingrediants: {indi.item_ingredients}
                      </p>
                      <p className="medium">${indi.item_price}</p>
                    </div>
                  ))}
                </div>
              );
            })
          : 'none'}
      </Fragment>
    </div>
  );
};

ViewRestaurantMenu.propTypes = {
  getMenuByRestName: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  menu: state.menu,
});

export default connect(mapStateToProps, { getMenuByRestName })(
  ViewRestaurantMenu
);
