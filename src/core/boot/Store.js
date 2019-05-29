/**
 * ./src/core/boot/Store.js
 */

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../state/reducers';

const loggerMiddleware = createLogger();

export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);