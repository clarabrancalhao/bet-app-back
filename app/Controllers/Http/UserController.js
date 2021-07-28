"use strict";

const User = use("App/Models/User");

class UserController {
  async store({ request }) {
    try {
      const data = request.only(["email", "password"]);

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

  async update({ request }) {
    const { email, password, user_id } = request.all();
    const user = await User.findOrFail(user_id);

    user.merge({ email, password });

    await user.save();

    return user;
  }
}

module.exports = UserController;
