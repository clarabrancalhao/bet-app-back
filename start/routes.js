"use strict";

const Route = use("Route");

Route.post("users", "UserController.store").validator("User");
Route.post("sessions", "SessionController.store").validator("Session");

Route.post("passwords", "ForgotPasswordController.store").validator(
  "ForgotPassword"
);
Route.put("passwords", "ForgotPasswordController.update").validator(
  "ResetPassword"
);

Route.group(() => {
  Route.resource("games", "GameController")
    .apiOnly()
    .validator(new Map([[["games.store"], ["Game"]]]));
  Route.resource("users.bets", "BetController")
    .apiOnly()
    .validator(new Map([[["users.bets.store"], ["Bet"]]]));
}).middleware(["auth"]);
