"use strict";

class Game {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      type: "required",
      description: "required",
      price: "required|number",
      range: "required|number",
      "max-number": "required|number",
      color: "required",
      "min-cart-value": "required|number",
    };
  }
}

module.exports = Game;
