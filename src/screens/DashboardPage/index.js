/**
 * ./src/screens/DashboardScreen/index.js
 */

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../core/state/actions';
import dashboardCopy from '../../core/constants/copy/dashboard';

const {
  ERROR,
  LOADING_USERS,
  NO_USERS_FOUND,
  USER_LIST,
  FIRST,
  LAST,
  USERNAME,
  HANDLE
} = dashboardCopy;

class DashboardScreen extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.users.getAll());
  }

  handleDeleteUser(id) {
    const { dispatch } = this.props;
    return () => dispatch(actions.users.remove(id));
  }

  renderDeleteButton(usr) {
    if (usr.deleteError) {
      return <span className="text-danger"> {ERROR}: {usr.deleteError}</span>  
    }

    if (usr.deleting) {
      return <button className="btn btn-outline-danger disabled" type="button">
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      </button>
    }

    return (
      <button onClick={this.handleDeleteUser(usr.id)} className="btn btn-outline-danger" type="button">
        <span className="oi oi-trash"></span>
      </button>
    );
  }

  renderUserList() {
    const { users } = this.props;

    if (users.loading || users.error) {
      return (
        <tbody>
          <tr>
            <td colSpan="5" className="text-center">
              {users.loading 
                ? <em><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> {LOADING_USERS}...</em> 
                : <span className="text-danger">{ERROR}: {users.error}</span>
              }
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {users.items && !users.items.length ? (
          <tr>
            <td colSpan="5" className="text-center">
              <span>{NO_USERS_FOUND}</span>
            </td>
          </tr>
        ) : (
          users.items.map((usr, i) =>
            <tr key={usr.id}>
              <th scope="row">{i + 1}</th>
              <td>{usr.firstname}</td>
              <td>{usr.lastname}</td>
              <td>@{usr.username}</td>
              <td>
                <button className="btn btn-outline-warning" type="button">
                  <span className="oi oi-pencil"></span>
                </button> &nbsp;
                {this.renderDeleteButton(usr)}
              </td>
            </tr>
          )
        )}
      </tbody>
    );
  }

  render() {
    return (
      <div className="row py-4">
        <div className="col-sm-12">
          <h3>{USER_LIST}</h3>
          <div className="table-responsive">
            <table className="table table-hover">
              <caption>{USER_LIST}</caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">{FIRST}</th>
                  <th scope="col">{LAST}</th>
                  <th scope="col">{USERNAME}</th>
                  <th scope="col">{HANDLE}</th>
                </tr>
              </thead>
              {this.renderUserList()}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, session }) {
  const { user } = session;
  return { user, users };
}

export default connect(mapStateToProps)(DashboardScreen);
