import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentRestMenu } from '../../actions/restmenu';
import { getCurrentRestProfile } from '../../actions/profile';
import auth from '../../reducers/auth';
//action getCurrentRestMenu
//RestaurantEventsDashboard= Restaurantmenuitems

const Restaurantmenuitems = ({
  getCurrentRestProfile,
  auth,
  getCurrentRestMenu,
  profile: { profile },
  menu: { allmenuitems, loading },
}) => {
  useEffect(() => {
    getCurrentRestMenu();
    getCurrentRestProfile();
  }, []);

  console.log(
    'inside rest menu items, all menu items ' + JSON.stringify(allmenuitems)
  );
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
        <h1 className="text-dark">{profile ? profile.Rest_Name : ' '} </h1>
        <Link to="/restaurantdashboard" className="lead text-primary">
          {' '}
          Return to Restaurant Page
        </Link>
        <br />
        <br />
        <Link to="/restaurant/editmenu" className="btn btn-dark">
          Edit/Add Menu
        </Link>
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

Restaurantmenuitems.propTypes = {
  getCurrentRestMenu: PropTypes.func.isRequired,
  getCurrentRestProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  menu: state.menu,
});

export default connect(mapStateToProps, {
  getCurrentRestMenu,
  getCurrentRestProfile,
})(Restaurantmenuitems);
