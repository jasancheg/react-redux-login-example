/**
 * ./src/core/utils/createAction.js
 */

export default (type, data) => {
  return typeof data === 'undefined' ? {type } : { type, payload: data };
}