const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const AuthModel = require("../Model/UserModel");
const errorResponse = require("../utils/errorResponse");

exports.protection = async (req, res, next) => {
  console.log(req.headers);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      next(new errorResponse("You are Not Authorized", 500));
    }
    try {
      let decoded = jwt.verify(token, JWT_SECRET);
      req.user = await AuthModel.findById(decoded.id);
      next();
    } catch (error) {
      console.log(error);
      next(new errorResponse("You are not Authorized", 500));
    }
  }
};

exports.authorize = (...allRoles) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!allRoles.includes(req.user.role)) {
      return next(
        new errorResponse(`${req.user.role} is not authorized to login`)
      );
    }
    next();
  };
};
