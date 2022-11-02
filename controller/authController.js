const { JWT_COOKIE_EXPIRE, NODE_ENV } = require("../config");
const AuthSchema = require("../Model/auth/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const _ = require("lodash");

//errorResponse function
const sendResponseToken = (user, statusCode, res) => {
  let TOKEN = user.regTOKEN();
  res.status(statusCode).json({
    success: true,
    message: "successfully token fetched",
    TOKEN,
  });
};

//user login controller
exports.userLoginController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await AuthSchema.findOne({})
    if (email || password === "") {
      return res
        .status(500)
        .json({ status: false, message: "please fill email and password" });
    } else if (email === user.email) {
      let Validuser = await AuthSchema.findOne({ email }).select("+password");
      let matchPassword = await Validuser.matchPASSWORD(password);
      if (!matchPassword) {
        return res
          .status(500)
          .json({ status: false, message: "password not matched" });
      }
      sendResponseToken(Validuser, 201, res);
    } else if (!email === !user.email) {
      console.log(email, user.email);
      return res.status(500).json({ status: false, message: "invalid email" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: "login failed" });
  }
};

//logout Controller
exports.logoutController = async (req, res, next) => {
  try {
    res
      .status(200)
      .json({ status: true, message: "You Logged Out Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Error while logout" });
  }
};

//request change password

exports.changePassword = async (req, res, next) => {
  try {
    let { currentPassword, newPassword, confirmNewPassword } = req.body;
    let userData = await AuthSchema.find({})
    if (currentPassword || newPassword || confirmNewPassword == "") {
      return res
        .status(500)
        .json({ status: false, message: "please fill Details" });
    }
      if (newPassword == confirmNewPassword) {
        let { password } = await AuthSchema.findOne({
          email: req.user.email,
        }).select("+password");

        let match = await bcrypt.compare(currentPassword, password);
        if (match) {
          let crypted = await bcrypt.genSalt(10);
          newPassword = await bcrypt.hash(newPassword, crypted);

          await AuthSchema.updateOne(
            { email: req.user.email },
            { $set: { password: newPassword } }
          );
          res.status(200).json({
            status: true,
            message: "password changed successfully,redirect to login page",
          });
        } else {
          res.status(500).json({
            status: false,
            message: "Enter Correct Present Password ",
          });
        }
      } else {
        res
          .status(400)
          .json({ status: false, message: "Match the New Password....🤦‍♂️" });
      }
  } catch (error) {
    console.log(error);
    next(new errorResponse("error"), 500);
  }
};
