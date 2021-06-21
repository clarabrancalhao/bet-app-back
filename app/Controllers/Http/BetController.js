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
  async index({ params: { users_id }, request }) {
    const { game_id } = request.get();
    const allBets = await Bet.query()
      .where("user_id", users_id)
      .with("game")
      .fetch();
    const bets = !!game_id
      ? await Bet.query()
          .where("user_id", users_id)
          .where("game_id", game_id)
          .with("game")
          .fetch()
      : allBets;
    return bets;
  }

  /**
   * Create/save a new bet.
   * POST bets
   */
  async store({ request, response, auth }) {
    const data = request.only(["game_id", "numbers"]);
    const game = await Game.findOrFail(data.game_id);
    if (data.numbers.length <= game["max-number"]) {
      console.log("aqui");
      const bet = await Bet.create({
        ...data,
        numbers: JSON.stringify(data.numbers),
        user_id: auth.user.id,
      });

      return bet;
    }
    response.status(400).send({
      error: {
        message: "Quantidade máxima de números selecionados excedida!",
      },
    });
  }
}

module.exports = BetController;
