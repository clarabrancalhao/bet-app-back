"use strict";

const Route = use("Route");

Route.post("users", "UserController.store");
Route.post("sessions", "SessionController.store");

Route.post("passwords", "ForgotPasswordController.store");
Route.put("passwords", "ForgotPasswordController.update");

Route.resource("games", "GameController").apiOnly();

Route.group(() => {
  Route.resource("users.bets", "BetController").apiOnly();
}).middleware(["auth"]);
