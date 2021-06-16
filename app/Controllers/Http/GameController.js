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
  async store({ request, response }) {}

  /**
   * Update game details.
   * PUT or PATCH games/:id
   */
  async update({ params, request, response }) {}

  /**
   * Delete a game with id.
   * DELETE games/:id
   */
  async destroy({ params, request, response }) {}
}

module.exports = GameController;
