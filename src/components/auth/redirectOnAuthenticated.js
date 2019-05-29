/**
 * ./src/components/auth/redirectOnAuthentication.js
 */

import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

//
export default (InnerComponent, options = { redirectTo: '/dashboard' }) => {
  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      console.log('componentWillMount', this.props);
      // this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      console.log('componentWillMount', nextProps);
      //this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      const { dispatch } = this.props;

      if (isAuthenticated) {
        dispatch(push(options.redirectTo));
      }
    }

    render() {
      return (
        <div className="auth-then-redirect">
          { !this.props.isAuthenticated ? <InnerComponent {...this.props} /> : null }
        </div>
      );
    }

  } // /class

  const mapStateToProps = (state) => {
    const { getIsAuthenticated } = sessionSelectors;

    return {
      isAuthenticated: getIsAuthenticated(state),
    };
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
};
 

