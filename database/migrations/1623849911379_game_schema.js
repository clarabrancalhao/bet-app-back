"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GameSchema extends Schema {
  up() {
    this.create("games", (table) => {
      table.increments();
      table.string("type").notNullable().unique();
      table.string("color").notNullable();
      table.float("price").notNullable();
      table.integer("range").notNullable();
      table.integer("max-number").notNullable();
      table.text("description").notNullable();
      table.float("min-cart-value");
      table.timestamps();
    });
  }

  down() {
    this.drop("games");
  }
}

module.exports = GameSchema;
