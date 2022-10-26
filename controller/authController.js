const { JWT_COOKIE_EXPIRE, NODE_ENV } = require("../config");
const AuthSchema = require("../Model/auth/Auth");
const errorResponse = require("../utils/errorResponse");
const bcrypt = require("bcryptjs");

exports.registerController = async (req, res, next) => {
  try {
    let data = req.body;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
