/**
 * ./src/components/navbar/index.js
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { routes } from '../../core/constants';
import actions from '../../core/state/actions';
import layoutCopy from '../../core/constants/copy/layout';
import logo from '../../assets/logo.svg';

class NavbarComponent extends React.Component {
  logout = () => {
    const { dispatch } = this.props;
    dispatch(actions.session.logout());
  }

  renderLogout() {
    return (
      <form className="form-inline">
        <button onClick={this.logout} className="btn btn-outline-dark my-2 my-sm-0" type="button">
          {layoutCopy.LOGOUT}
        </button>
      </form>
    );
  }

  render() {
    const { authenticated, user } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light navbar-bg">
        <div className="container">
          <Link className="navbar-brand" to={routes.dashboard}>
            <img className="d-inline-block align-top" src={logo} alt="" width="30" height="30" />
          </Link>
          {authenticated ? <span className="navbar-text">{`${user.firstname} ${user.lastname}`}</span> : null}
          {authenticated ? this.renderLogout() : null}
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ session }) {
  return {
    authenticated: session.authenticated,
    user: session.user
  };
}

export default connect(mapStateToProps)(NavbarComponent);
