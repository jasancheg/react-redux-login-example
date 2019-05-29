/**
 * ./src/core/boot/App/index.js
 */

import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import DashboardScreen from '../../screens/DashboardPage';
import SignUpScreen from '../../screens/SignUpScreen';
import LoginScreen from '../../screens/LoginScreen';
import { PrivateRoute, Navbar } from '../../components';
import { routes } from '../constants';
import actions from '../state/actions';
import { history } from '../utils';

class App extends React.Component {
  componentDidMount() {
    history.listen(() => {
      const { dispatch, notification } = this.props;
      // clear notification on location change when needed
      if (notification && notification.message) {
        dispatch(actions.notification.clear());
      }
    });
  }

  renderFeedback() {
    const { notification } = this.props;
    return (
      <div className="row notification-box">
        <div className="col col-sm-12">
          <div className={`alert ${notification.type}`}>
            {notification.message}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { notification } = this.props;

    return (
      <div>
        {notification.message ? this.renderFeedback() : null}
        <Router history={history}>
          <Navbar />
          <div className="container">
            <PrivateRoute exact path={routes.dashboard} component={DashboardScreen} />
            <Route path={routes.login} component={LoginScreen} />
            <Route path={routes.signup} component={SignUpScreen} />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps({ notification }) {
  return { notification };
}

export default connect(mapStateToProps)(App);
