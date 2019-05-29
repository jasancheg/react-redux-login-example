/**
 * ./src/core/state/actions/user.js
 */

import { history, createAction } from '../../utils';
import { types, routes } from '../../constants';
import { sessionService } from '../../services';
import copy from '../../constants/copy/layout';
import notificationActions from './notification';

const {
  CLEAN_LOGIN_FORM,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGOUT,
} = types;

const { WELCOME } = copy;

function login(username, password) {
  return dispatch => {
    dispatch(createAction(LOGIN_REQUEST, { username }));

    sessionService.login(username, password)
      .then(
        user => { 
          dispatch(createAction(LOGIN_SUCCESS, user));
          history.push(routes.dashboard);
        },
        error => {
          dispatch(createAction(LOGIN_FAILURE, error.toString()));
        }
      );
  };
}

function cleanForm() {
  return dispatch => {
    dispatch(createAction(CLEAN_LOGIN_FORM));
  };
}

function logout() {
  return dispatch => {
    sessionService.logout();
    dispatch(createAction(LOGOUT));
    history.push(routes.login);
  };
}

function signup(user) {
  return dispatch => {
    const { password, ...userCopy } = user;
    dispatch(createAction(REGISTER_REQUEST, userCopy));

    sessionService.signup(user)
      .then(
        usr => {
          dispatch(createAction(REGISTER_SUCCESS, usr));
          dispatch(notificationActions.success(`${WELCOME} ${usr.firstname} ${usr.lastname}`));
          history.push(routes.dashboard);
        },
        error => {
          dispatch(createAction(REGISTER_FAILURE, error.toString()));
        }
      );
  };
}

export default {
  cleanForm,
  logout,
  signup,
  login
};
