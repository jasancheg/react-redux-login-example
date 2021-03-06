/**
 * ./src/core/services/session.js
 */

import { config } from '../constants';

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text()
    .then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));

        return user;
    });
}

function signup(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/users/signup`, requestOptions)
    .then(handleResponse)
    .then(usr => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(usr));

      return usr;
  });
}

export default {
  signup,
  logout,
  login
};