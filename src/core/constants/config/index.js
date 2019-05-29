/**
 * ./src/core/config/index.js
 */

export default {
  appVersion: "0.0.1",
  appName: "Login Sample",

  apiUrl: "http://localhost:4000",
  signinEndpoint: "v1/signin",
  signupEndpoint: "v1/signup",

  get signInUrl(): string {
    return this.apiUrl + this.signinEndpoint;
  },

  get signUpUrl(): string {
    return this.apiUrl + this.signupEndpoint;
  }
};
