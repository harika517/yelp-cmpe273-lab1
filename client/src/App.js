import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/LandingPage/Navbar';
import Login from './components/Customer/Login';
import Signup from './components/Customer/Signup';
import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Route path="/" component={Navbar} />
        <section className="container">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
