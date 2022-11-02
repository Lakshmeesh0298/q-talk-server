const express = require("express");
const {
  userLoginController,
  changePassword,
  logoutController,
} = require("../controller/authController");

const authrouter = express.Router();

authrouter.post("/login", userLoginController);
authrouter.get("/logout", logoutController);
authrouter.put("/changepass", changePassword);

module.exports = authrouter;
