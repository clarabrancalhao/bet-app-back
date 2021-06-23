"use strict";

const User = use("App/Models/User");

class SessionController {
  async store({ request, response, auth }) {
    try {
      const { email, password } = request.all();
      const user = await User.findByOrFail("email", email);

      const token = await auth.attempt(email, password);

      return { ...token, user_id: user.id };
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: "Algo não deu certo, confira os dados e tente novamente.",
        },
      });
    }
  }
}

module.exports = SessionController;
