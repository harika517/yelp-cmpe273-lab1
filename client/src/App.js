import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/LandingPage/Navbar';
import Landing from './components/LandingPage/Landing';
import Login from './components/Customer/Login';
import Signup from './components/Customer/Signup';
import LoginRestaurant from './components/Restaurant/LoginRestaurant';
import SignUpRestaurant from './components/Restaurant/SignUpRestaurant';
import CurbSidePickUp from './components/SearchBarResults/CurbSidePickUp';
import DineIn from './components/SearchBarResults/DineIn';
import Yelp_Delivery from './components/SearchBarResults/YelpDelivery';
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
import AddReview from './components/Reviews/AddReview';
import ViewRestaurants from './components/dashboard/ViewRestaurantsDashboard';
import ViewRestaurantPage from './components/dashboard/ViewRestaurantPage';
import ViewRestaurantMenu from './components/dashboard/ViewRestaurantMenu';
import ViewEventsAttending from './components/dashboard/ViewEventsAttending';
import ViewAttendees from './components/Social_Events/ViewAttendees';
import CustomerDetailRegistration from './components/Social_Events/CustomerDetailRegistration';
import WriteReviews from './components/Reviews/Reviews';
import PrivateRoute from './components/routing/PrivateRoute';
import customerDetailsByName from './components/Customer/Customerdetailsbyname';
import CustomerViewOrders from './components/Orders/CustomerViewOrders';
import CustomerCreateOrders from './components/Orders/CustomerCreateOrders';
import RestaurantUpdateOrder from './components/Orders/RestaurantUpdateOrder';
import ViewOrdersByNewOrder from './components/Orders/ViewOrdersByNewOrder';
// import ViewOrdersByStatus from './components/Orders/ViewOrdersByNewOrder';
// import EventRegistration from './components/Social_Events/EventRegistration';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadCustomer, loadRestaurantUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';
// import YelpDelivery from './components/SearchBarResults/YelpDelivery';

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

              <Route exact path="/curbsidepickup" component={CurbSidePickUp} />
              <Route exact path="/dinein" component={DineIn} />
              <Route exact path="/yelpdelivery" component={Yelp_Delivery} />

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
                path="/restaurants/editevent/:Event_Name"
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
                path="/viewrestaurantpage/:Rest_Id_signup"
                component={ViewRestaurantPage}
              />
              <PrivateRoute
                exact
                path="/ordersplaced"
                component={CustomerViewOrders}
              />
              <PrivateRoute
                exact
                path="/viewmenu/:Rest_Name"
                component={ViewRestaurantMenu}
              />
              <PrivateRoute
                exact
                path="/placeorder"
                component={CustomerCreateOrders}
              />

              <PrivateRoute
                exact
                path="/writecustomerreview/:Rest_Id_signup"
                component={AddReview}
              />

              <PrivateRoute
                exact
                path="/viewregisteredevents/:Cust_Name"
                component={ViewEventsAttending}
              />

              <PrivateRoute
                exact
                path="/viewattendees/:Event_Name"
                component={ViewAttendees}
              />

              <PrivateRoute
                exact
                path="/viewattendees/:Event_Name/:Cust_Name"
                component={CustomerDetailRegistration}
              />

              <PrivateRoute
                exact
                path="/orders/update/:order_id"
                component={RestaurantUpdateOrder}
              />

              <PrivateRoute
                exact
                path="/restaurant/orders/:Rest_Name/:search_status"
                component={ViewOrdersByNewOrder}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
