import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/LandingPage/Navbar';
import Login from './components/Customer/Login';
import Signup from './components/Customer/Signup';
import Alert from './components/LandingPage/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/Createprofile';
import EditProfile from './components/profile-forms/Editprofile';
import PrivateRoute from './components/routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadCustomer } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import Landing from './components/LandingPage/Landing';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadCustomer());
  }, []); //componentDidMount
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route path="/" component={Navbar} />
          {/* <Route path="/" component={Landing} /> */}
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/createprofile"
                component={CreateProfile}
              />
              <PrivateRoute exact path="/editprofile" component={EditProfile} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
