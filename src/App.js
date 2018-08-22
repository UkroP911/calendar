import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import * as routes from './constants/routes';
import withAuthentication from './components/withAuthentication';

import './assets/style/calendar.css';

import Calendar from './containers/Calendar';
import SignInPage from './containers/SignIn';
import SignUpPage from './containers/SignUp';

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <Route exact path={routes.SIGN_IN} component={SignInPage}/>
                <Route exact path={routes.SIGN_UP} component={SignUpPage}/>
                <Route exact path={routes.CALENDAR} component={Calendar}/>
            </div>
        </Router>
    );
  }
}

export default withAuthentication(App);
