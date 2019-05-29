/**
 * ./src/state/actions/user.js
 */

import { usersService } from '../../services';
import { createAction } from '../../utils';
import { types } from '../../constants';

const {
  GETALL_REQUEST,
  GETALL_SUCCESS,
  GETALL_FAILURE,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} = types;

function getAll() {
  return dispatch => {
    dispatch(createAction(GETALL_REQUEST));

    usersService.getAll()
      .then(
        users => dispatch(createAction(GETALL_SUCCESS, users)),
        error => dispatch(createAction(GETALL_FAILURE, error.toString()))
      );
  };
}

function remove(id) {
  return dispatch => {
    dispatch(createAction(DELETE_REQUEST, id));

    usersService.remove(id)
      .then(
        // eslint-disable-next-line no-unused-vars
        user => {
          dispatch(createAction(DELETE_SUCCESS, id))
        },
        error => dispatch(createAction(DELETE_FAILURE, {id, error: error.toString()}))
      );
  };  
}

export default {
  getAll,
  remove
};
