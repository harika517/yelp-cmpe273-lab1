import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/LandingPage/Navbar';
import Landing from './components/LandingPage/Landing';
import Login from './components/Customer/Login';
import Signup from './components/Customer/Signup';
import LoginRestaurant from './components/Restaurant/LoginRestaurant';
import SignUpRestaurant from './components/Restaurant/SignUpRestaurant';

import Alert from './components/LandingPage/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/Createprofile';
import EditProfile from './components/profile-forms/Editprofile';
import CreateRestProfile from './components/profile-forms/Createrestprofile';
import EditRestaurantProfile from './components/profile-forms/Editrestprofile';
import EventCreation from './components/Social_Events/Createevent';
// import EventsDashboard from './components/dashboard/EventsDashboard';
import RestEditEvent from './components/Social_Events/Restedititem';
import ViewEvents from './components/Social_Events/Viewevents';
import ViewEventDetails from './components/Social_Events/Eventdetail';
import RestaurantEventsDashboard from './components/dashboard/RestaurantEventsDashboard';
import RestaurantDashboard from './components/dashboard/RestaurantDashboard';
import RestaurantMenuItems from './components/RestaurantMenuItems/Restaurantmenuitems';
import RestaurantMenuItemCreate from './components/RestaurantMenuItems/RestaurantMenuItemCreate';
import RestaurantReviews from './components/Reviews/Reviews';
import RestaurantOrders from './components/Orders/RestaurantViewOrders';
import ViewRestaurants from './components/dashboard/ViewRestaurantsDashboard';
import ViewRestaurantPage from './components/dashboard/ViewRestaurantPage';
import WriteReviews from './components/Reviews/Reviews';
import PrivateRoute from './components/routing/PrivateRoute';
import customerDetailsByName from './components/Customer/Customerdetailsbyname';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadCustomer, loadRestaurantUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadCustomer());
    store.dispatch(loadRestaurantUser());
  }); //componentDidMount
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Route path="/" component={Navbar} /> */}
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/restaurants" component={LoginRestaurant} />
              <Route
                exact
                path="/restaurants/signup"
                component={SignUpRestaurant}
              />
              <Route exact path="/events" component={ViewEvents} />
              {/* <Route path="/" component={Landing} /> */}
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/createprofile"
                component={CreateProfile}
              />
              <PrivateRoute exact path="/editprofile" component={EditProfile} />
              {/* <PrivateRoute exact path="/events" component={EventsDashboard} /> */}
              <PrivateRoute
                exact
                path="/restaurantdashboard"
                component={RestaurantDashboard}
              />
              <PrivateRoute
                exact
                path="/restaurantevents"
                component={RestaurantEventsDashboard}
              />
              <PrivateRoute
                exact
                path="/createevent"
                component={EventCreation}
              />
              <PrivateRoute
                exact
                path="/restaurants/editevent"
                component={RestEditEvent}
              />
              <PrivateRoute
                exact
                path="/restaurantprofile"
                component={CreateRestProfile}
              />
              <PrivateRoute
                exact
                path="/editrestaurantprofile"
                component={EditRestaurantProfile}
              />
              <PrivateRoute
                exact
                path="/restaurant/menu"
                component={RestaurantMenuItems}
              />
              <PrivateRoute
                exact
                path="/restaurant/editmenu"
                component={RestaurantMenuItemCreate}
              />
              <PrivateRoute
                exact
                path="/viewevent/:Event_Name"
                component={ViewEventDetails}
              />
              <PrivateRoute
                exact
                path="/reviews"
                component={RestaurantReviews}
              />
              <PrivateRoute
                exact
                path="/writereview/:Rest_Name"
                component={WriteReviews}
              />
              <PrivateRoute
                exact
                path="/reviews"
                component={RestaurantReviews}
              />

              <PrivateRoute
                exact
                path="/restaurant/orders/:Rest_Name"
                component={RestaurantOrders}
              />

              <PrivateRoute
                exact
                path="/orders/:Cust_Name"
                component={customerDetailsByName}
              />
              <PrivateRoute
                exact
                path="/viewrestaurants"
                component={ViewRestaurants}
              />
              <PrivateRoute
                exact
                path="/viewrestaurantpage"
                component={ViewRestaurantPage}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
