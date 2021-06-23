"use strict";

const User = use("App/Models/User");

class UserController {
  async store({ request }) {
    try {
      const data = request.only(["email", "password"]);
      console.log(data);

      const user = await User.create(data);

      return user;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: "Algo não deu certo, confira os dados e tente novamente.",
        },
      });
    }
  }
}

module.exports = UserController;
