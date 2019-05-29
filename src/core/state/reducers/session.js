/**
 * ./src/core/state/reducers/aunth.js
 */

import { types, initialState } from '../../constants';


const usr = JSON.parse(localStorage.getItem('user'));

const initial = {
  ...initialState.session,
  authenticated: usr !== null,
  user: usr || {}
};

export default (state = initial, action) => {

  const { type, payload } = action; 

  switch (type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        inProgress: true,
        user: payload
      };
    
    case types.REGISTER_REQUEST:
      return {
        ...state, 
        inProgress: true,
        user: payload
      };
    
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        inProgress: false,
        authenticated: true,
        user: payload
      };
    
    case types.REGISTER_FAILURE:
    case types.LOGIN_FAILURE:
      return {
        ...initialState.session,
        error: payload
      };
    
    case types.CLEAN_LOGIN_FORM:
    case types.LOGOUT:
      return initialState.session;

    default:
      return state
  }
}