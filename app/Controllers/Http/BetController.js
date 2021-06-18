"use strict";

const Bet = use("App/Models/Bet");
const Game = use("App/Models/Game");

/**
 * Resourceful controller for interacting with bets
 */
class BetController {
  /**
   * Show a list of all bets.
   * GET bets
   */
  async index({ params, request }) {
    const queryParams = request.get();
    const bets = await Bet.query().where("user_id", params.users_id).fetch();
    const filteredBets = queryParams.game_id
      ? bets.rows.filter((bet) => bet.game_id === Number(queryParams.game_id))
      : bets;

    return filteredBets;
  }

  /**
   * Create/save a new bet.
   * POST bets
   */
  async store({ request, response, auth }) {
    const data = request.only(["game_id", "numbers"]);

    const bet = await Bet.create({
      ...data,
      numbers: JSON.stringify(data.numbers),
      user_id: auth.user.id,
    });

    return bet;
  }
}

module.exports = BetController;
