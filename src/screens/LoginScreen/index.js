/**
 * ./src/screens/LoginScreen/index.js
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert } from '../../components';
import actions from '../../core/state/actions';
import loginCopy from '../../core/constants/copy/login';
import routes from '../../core/constants/routes';
import logo from '../../assets/logo.svg';

const {
  LOADING,
  SIGN_IN,
  PLEASE_SIGN_IN,
  USERNAME,
  PASSWORD,
  USERNAME_REQUIRED,
  PASSWORD_REQUIRED,
  DONT_HAVE_AN_ACCOUNT,
  SIGN_UP,
} = loginCopy;

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false
    };
  }

  componentDidMount() {
    const { dispatch, error } = this.props;
    if(error) {
      dispatch(actions.session.cleanForm());
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(actions.session.login(username, password));
    }
  }

  renderButton() {
    const { inProgress } = this.props;
  
    if (inProgress) {
      return (
        <button className="btn btn-primary btn-block" type="button" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          &nbsp; {LOADING}...
        </button>
      );
    }

    return (
      <button className="btn btn-primary btn-block" type="submit">
        {SIGN_IN}
      </button>
    );
  }

  render() {
    const { username, password, submitted } = this.state;
    const { error } = this.props;

    return (
      <div className="row">
        <div className="col col-sm-12">
          <form className="form-signin"  name="form" onSubmit={this.handleSubmit}>
            <div>
              <img className="mb-4" src={logo} alt="" width="72" height="72" />
              <h1 className="h3 mb-3 font-weight-normal">{PLEASE_SIGN_IN}</h1>
            </div>
            {error ? <Alert type="danger">{error}</Alert> : null}
            <div>
              <label htmlFor="username" className="sr-only">{USERNAME}</label>
              <input 
                type="text" 
                id="username"
                name="username"
                className="form-control" 
                value={username} 
                onChange={this.handleChange}
                placeholder={USERNAME} />
              <label htmlFor="password" className="sr-only">{PASSWORD}</label>
              <input 
                type="password" 
                id="password" 
                className="form-control" 
                name="password" 
                value={password} 
                onChange={this.handleChange}
                placeholder={PASSWORD} />
              {submitted && !username &&
                <small className="form-text text-muted">{USERNAME_REQUIRED}</small>
              }
              {submitted && !password &&
                <small className="form-text text-muted">{PASSWORD_REQUIRED}</small>
              }
            </div>
            <div>
              {this.renderButton()}
            </div>
            <div>
              <p>{DONT_HAVE_AN_ACCOUNT} <Link to={routes.signup}>{SIGN_UP}</Link></p>
            </div>
          </form>
        </div>    
      </div>
    );
  }
}

function mapStateToProps({ session }) {
  return {
    inProgress: session.inProgress,
    error: session.error
  };
}

export default connect(mapStateToProps)(LoginScreen);
