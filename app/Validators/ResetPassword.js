"use strict";

class ResetPassword {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      password: "required",
      token: "required",
    };
  }
}

module.exports = ResetPassword;
