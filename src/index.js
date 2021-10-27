import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/Login'
import Landing from './components/Landing'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    withRouter
  } from 'react-router-dom';

//Our Auth Service
import AuthHelperMethods from './auth/AuthHelperMethods';

import * as serviceWorker from './serviceWorker';

const Auth = new AuthHelperMethods();

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      Auth.loggedIn() === true
        ? <Component {...props} />
        : <Redirect to='/auth/login'/>
    )} />
)

const AuthProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      Auth.loggedIn() === false
        ? <Component {...props} />
        : <Redirect to='/app'/>
    )} />
)

const routing = (
    <Router>
        <div>
            <Switch>
                <Route path ="view" exact component={Landing} />
                <ProtectedRoute path="/view" component={App} />
                <ProtectedRoute path="/app" component={App} />
                <AuthProtectedRoute path="/auth/login" component={Login} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
