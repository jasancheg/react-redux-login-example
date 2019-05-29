/**
 * ./src/components/auth/PrivateRoute.js
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routes } from '../../core/constants';

export default ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('user')
      ? <Component {...props} />
      : <Redirect to={{ pathname: routes.login, state: { from: props.location } }} />
  )} />
)