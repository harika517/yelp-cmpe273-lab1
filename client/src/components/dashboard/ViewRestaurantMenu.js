import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMenuByRestID } from '../../actions/restmenu';
import { getCurrentProfile } from '../../actions/profile';
import { Restaurantmenuitems } from '../RestaurantMenuItems/Restaurantmenuitems';
// import { getCurrentRestProfile } from '../../actions/profile';

const ViewRestaurantMenu = ({
  getMenuByRestID,
  getCurrentProfile,
  profile: { profile },
  menu: { allmenuitems, loading },
  match,
}) => {
  useEffect(() => {
    // console.log('Inside useeffect, viewRestaurantmenu', match.params.Rest_Name);
    getCurrentProfile();
    getMenuByRestID(match.params.Rest_Id_signup);
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

  let backendimageserver = `http://54.215.250.62:3002/item/getphoto/dishitem/`;

  return (
    <div>
      <Fragment>
        <h1 className="text-dark">
          {' '}
          {/* {allmenuitems ? allmenuitems[0].Rest_Name : ' '}{' '} */}{' '}
        </h1>{' '}
        <Link to="/viewrestaurants" className="btn btn-primary">
          {' '}
          Return to Restaurant Page{' '}
        </Link>{' '}
        {/* <Link to={`/placeorder`} className="btn btn-dark">
                      Build Your Order
                    </Link> */}{' '}
        <br />
        <br />
        <hr> </hr>{' '}
        {/* {allmenuitems
                      ? allmenuitems.map((item) => (
                          <p>
                            {item.item_name} | {item.item_description} |{' '}
                            {item.item_category} |{item.item_ingredients} |{' '}
                            {item.item_price}
                          </p>
                        ))
                      : 'none'} */}{' '}
        {newobj
          ? Object.keys(newobj).map((k, idx) => {
              return (
                <div>
                  <h3> {k} </h3>{' '}
                  {newobj[k].map((indi) => (
                    <fragment>
                      <div className="card mb-3">
                        <div className="row no-gutters">
                          <div className="col-md-4">
                            {' '}
                            {/* <img
                                                                  className="menu_image"
                                                                  src={indi.item_image}
                                                                  className="card-img"
                                                                  alt="Item Picture"
                                                                /> */}
                            <img
                              src={
                                indi.item_image
                                  ? `${backendimageserver}${indi.item_image}`
                                  : `${backendimageserver}image`
                              }
                              alt="Item Picture"
                            />
                          </div>{' '}
                          <div class="col-md-8">
                            <div class="card-body">
                              <h4 className="text-dark bold">
                                {' '}
                                {indi.item_name}{' '}
                              </h4>{' '}
                              <p className="medium">
                                {' '}
                                {indi.item_description}{' '}
                              </p>{' '}
                              <p className="medium">
                                Ingrediants: {indi.item_ingredients}{' '}
                              </p>{' '}
                              <p className="medium"> $ {indi.item_price} </p>{' '}
                            </div>{' '}
                            <div>
                              <Link
                                to={`/viewmenu/placeorder/${indi.item_id}`}
                                className="btn btn-dark small"
                              >
                                {' '}
                                Order{' '}
                              </Link>{' '}
                            </div>{' '}
                          </div>{' '}
                        </div>{' '}
                      </div>{' '}
                      <br />
                    </fragment>
                    // <div>
                    //   <p className="lead">{indi.item_name}</p>
                    //   <p className="medium">{indi.item_description}</p>
                    //   <p className="medium">
                    //     Ingrediants: {indi.item_ingredients}
                    //   </p>
                    //   <p className="medium">${indi.item_price}</p>
                    // </div>
                  ))}{' '}
                </div>
              );
            })
          : 'none'}{' '}
      </Fragment>{' '}
    </div>
  );
};

ViewRestaurantMenu.propTypes = {
  getMenuByRestID: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  menu: state.menu,
});

export default connect(mapStateToProps, { getMenuByRestID, getCurrentProfile })(
  ViewRestaurantMenu
);
