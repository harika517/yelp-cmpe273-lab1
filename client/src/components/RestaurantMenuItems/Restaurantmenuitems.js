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
                      <Link
                        to={`/menu/update/${indi.item_id}`}
                        className="text-primary"
                      >
                        {' '}
                        edit
                      </Link>

                      <img
                        className="menu_image"
                        src={indi.item_image}
                        class="card-img"
                        alt="..."
                      />
                      <p className="medium">{indi.item_description}</p>
                      <p className="medium">
                        Ingrediants: {indi.item_ingredients}
                      </p>
                      <p className="medium">${indi.item_price}</p>
                    </div>
                    // <div className="card mb-3" style="max-width: 540px;">
                    //   <div className="row no-gutters">
                    //     <div className="col-md-4">
                    //       <img
                    //         src={indi.item_image}
                    //         className="card-img"
                    //         alt="..."
                    //       />
                    //     </div>
                    //     <div className="col-md-8">
                    //       <div className="card-body">
                    //         <h5 className="card-title">{indi.item_name}</h5>
                    //         <p className="card-text">
                    //           {' '}
                    //           {indi.item_description}
                    //         </p>
                    //         <p className="card-text">{indi.item_ingredients}</p>
                    //         <p className="card-text">${indi.item_price}</p>
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
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
