const { JWT_COOKIE_EXPIRE, NODE_ENV } = require("../config");
const AuthSchema = require("../Model/auth/Auth");
const bcrypt = require("bcryptjs");

exports.loginController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    console.log(req.body);
    let user = await AuthSchema.find({ email }).select("+password");
    console.log(user);

    // let TOKEN = user.regToken();

    res.status(201).json(req.body);
    next();
  } catch (error) {
    console.log(error);
  }
};
