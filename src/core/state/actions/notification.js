/**
 * ./src/core/state/actions/notification.js
 */

// import { createAction } from '../../core/utils';
import { types } from '../../constants';

const {
  NOTIFICATION_SUCCESS,
  NOTIFICATION_ERROR,
  NOTIFICATION_CLEAR
} = types;

function success(message) {
  return { type: NOTIFICATION_SUCCESS, message };
}

function error(message) {
  return { type: NOTIFICATION_ERROR, message };
}

function clear() {
  return { type: NOTIFICATION_CLEAR };
}

export default {
  success,
  error,
  clear
};