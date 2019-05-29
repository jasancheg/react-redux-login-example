/**
 * ./src/core/state/reducers/notification.js
 */

import { types, initialState } from '../../constants';

export default (state = {}, action) => {

  const { type } = action; 

  switch (type) {
    case types.NOTIFICATION_SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };

    case types.NOTIFICATION_ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    
    case types.NOTIFICATION_CLEAR:
      return initialState.notification;

    default:
      return state
  }
}