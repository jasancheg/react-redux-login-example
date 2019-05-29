/**
 * ./src/core/state/reducers/users.js
 */

import { types, initialState } from '../../constants';

export default (state = initialState.users, action) => {

  const { type, payload } = action; 

  switch (type) {
    case types.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.GETALL_SUCCESS:
      return {
        ...initialState.users,
        items: payload
      };

    case types.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };

    case types.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map(user =>
          user.id === payload
            ? { ...user, deleting: true }
            : user
        )
      };

    case types.DELETE_SUCCESS:
      return {
        items: state.items.filter(user => user.id !== payload)
      };

    case types.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === payload) {
            const { deleting, ...userCopy } = user;
            return { ...userCopy, error: payload };
          }

          return user;
        })
      };

    default:
      return state
  }
}