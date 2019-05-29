/**
 * ./src/screens/SignUpScreen/index.js
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert } from '../../components';
import actions from '../../core/state/actions';
import signupCopy from '../../core/constants/copy/signup';
import routes from '../../core/constants/routes';

const {
  LOADING,
  SIGN_UP,
  FIRSTNAME,
  FIRSTNAME_IS_REQUIRED,
  LASTNAME,
  LASTNAME_IS_REQUIRED,
  USERNAME,
  USERNAME_IS_REQUIRED,
  PASSWORD,
  PASSWORD_IS_REQUIRED,
  ALREADY_HAVE_AN_ACCOUNT,
  SIGN_IN  
} = signupCopy;

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstname: '',
        lastname: '',
        username: '',
        password: ''
      },
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
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstname && user.lastname && user.username && user.password) {
      dispatch(actions.session.signup(user));
    }
  }

  renderButton() {
    const { inProgress  } = this.props;
  
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
        {SIGN_UP}
      </button>
    );
  }

  render() {
    const { user, submitted } = this.state;
    const { error } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col col-sm-12">
            <form className="form-signup" name="form" onSubmit={this.handleSubmit}>
              <div>
                <h1 className="h3 mb-3 font-weight-normal">{SIGN_UP}</h1>
              </div>
              {error ? <Alert type="danger">{error}</Alert> : null}
              <div>
                <label htmlFor="firstname">{FIRSTNAME}
                  <input 
                    type="text" 
                    id="firstname"
                    name="firstname" 
                    className="form-control" 
                    value={user.firstname} 
                    onChange={this.handleChange}
                    placeholder={FIRSTNAME} />
                </label>
                {submitted && !user.firstname &&
                  <small className="form-text text-muted">{FIRSTNAME_IS_REQUIRED}</small>
                }
              </div>
              <div>
                <label htmlFor="lastname">{LASTNAME}
                  <input 
                    type="text" 
                    id="lastname"
                    name="lastname" 
                    className="form-control" 
                    value={user.lastname} 
                    onChange={this.handleChange}
                    placeholder={LASTNAME} />
                </label>
                {submitted && !user.lastname &&
                  <small className="form-text text-muted">{LASTNAME_IS_REQUIRED}</small>
                }
              </div>
              <div>
                <label htmlFor="username">{USERNAME}
                  <input 
                    type="text" 
                    id="username"
                    name="username" 
                    className="form-control" 
                    value={user.username} 
                    onChange={this.handleChange}
                    placeholder={USERNAME} />
                </label>
                {submitted && !user.username &&
                  <small className="form-text text-muted">{USERNAME_IS_REQUIRED}</small>
                }
              </div>
              <div>
                <label htmlFor="password">{PASSWORD}
                  <input
                    id="password"
                    type="password" 
                    className="form-control" 
                    name="password" 
                    value={user.password} 
                    onChange={this.handleChange}
                    placeholder={PASSWORD} />
                </label>
                {submitted && !user.password &&
                  <small className="form-text text-muted">{PASSWORD_IS_REQUIRED}</small>
                }
              </div>
              <div>
                {this.renderButton()}
              </div>
              <div>
                <p>{ALREADY_HAVE_AN_ACCOUNT} <Link to={routes.login}>{SIGN_IN}</Link></p>
              </div>
            </form>
          </div>    
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

export default connect(mapStateToProps)(SignUpScreen);
