"use strict";

const Bet = use("App/Models/Bet");
const Game = use("App/Models/Game");
const Mail = use("Mail");

/**
 * Resourceful controller for interacting with bets
 */
class BetController {
  /**
   * Show a list of all bets.
   * GET bets
   */
  async index({ params: { users_id }, request, response }) {
    try {
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
    } catch (err) {
      return response.status(err.status).send({
        error: { message: "Algo não deu certo" },
      });
    }
  }

  /**
   * Create/save a new bet.
   * POST bets
   */
  async store({ request, response, auth }) {
    try {
      const data = request.collect(["bets"]);
      const gameTable = await Game.query().fetch();
      const gamesRows = gameTable.rows;
      const games = gamesRows.map((game) => {
        return game["$attributes"];
      });
      const gameName = games.map((game) => game.type).join(", ");

      const bets = data.map((bet) => {
        const game = games.find((game) => game.id === bet.bets.game_id);
        const newBet = {
          game_id: bet.bets.game_id,
          numbers: JSON.stringify(bet.bets.numbers),
          price: game.price,
          user_id: auth.user.id,
        };
        return newBet;
      });

      await Bet.createMany(bets);

      await Mail.send(
        ["emails.new_bets"],
        {
          name: auth.user.username,
          games: gameName,
        },
        (message) => {
          message
            .to(auth.user.email)
            .from("clara.brancalhao@luby.software", "Clara B.")
            .subject("Confirmação de Compra");
        }
      );

      return bets;
    } catch (err) {
      return response.status(err.status).send({
        error: { message: "Algo não deu certo" },
      });
    }
  }
}

module.exports = BetController;
