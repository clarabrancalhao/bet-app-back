"use strict";

const Game = use("App/Models/Game");

/**
 * Resourceful controller for interacting with games
 */
class GameController {
  /**
   * Show a list of all games.
   * GET games
   */

  async index({ request, response, view }) {
    const games = await Game.all();

    return games;
  }

  /**
   * Create/save a new game.
   * POST games
   */
  async store({ request, response }) {
    try {
      const data = request.only([
        "type",
        "color",
        "price",
        "range",
        "max-number",
        "description",
        "min-cart-value",
      ]);

      const game = await Game.create(data);

      return game;
    } catch (err) {
      return response.status(err.status).send({
        error: { message: "Algo não deu certo" },
      });
    }
  }

  /**
   * Update game details.
   * PUT or PATCH games/:id
   */
  async update({ params, request, response }) {
    try {
      const game = await Game.findOrFail(params.id);
      const data = request.only([
        "type",
        "color",
        "price",
        "range",
        "max-number",
        "description",
        "min-cart-value",
      ]);

      game.merge(data);

      await game.save();

      return game;
    } catch (err) {
      return response.status(err.status).send({
        error: { message: "Algo não deu certo" },
      });
    }
  }

  /**
   * Delete a game with id.
   * DELETE games/:id
   */
  async destroy({ params, request, response }) {
    try {
      const game = await Game.findOrFail(params.id);

      await game.delete();
    } catch (err) {
      return response.status(err.status).send({
        error: { message: "Algo não deu certo" },
      });
    }
  }
}

module.exports = GameController;
