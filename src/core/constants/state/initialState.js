/**
 * ./src/core/constants/state/initialState.js
 */

const notification = {
  message: '',
  type: ''
};

const session = {
  authenticated: false,
  inProgress: false,
  error: '',
  user: {}
};

const users = {
  loading: false,
  items: [],
  error: ''
};

export default {
  notification,
  session,
  users
}