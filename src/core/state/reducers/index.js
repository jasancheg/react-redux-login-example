/**
 * ./src/core/state/reducers/index.js
 */

import { combineReducers } from 'redux';

import notification from './notification';
import session from './session';
import users from './users';

const rootReducer = combineReducers({
  notification,
  session,
  users
});

export default rootReducer;