const express = require("express");
const { loginController } = require("../controller/authController");

const authrouter = express.Router();

authrouter.post("/login", loginController);

module.exports = authrouter;
