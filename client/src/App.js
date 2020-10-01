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
import EventCreation from './components/Social_Events/Createevent';
// import EventsDashboard from './components/dashboard/EventsDashboard';
import ViewEvents from './components/Social_Events/Viewevents';
import RestaurantEventsDashboard from './components/dashboard/RestaurantEventsDashboard';
import RestaurantDashboard from './components/dashboard/RestaurantDashboard';
import PrivateRoute from './components/routing/PrivateRoute';
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
