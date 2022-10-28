require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  MONGOLOCAL_URL: process.env.MONGOLOCAL_URL,
  MONGOATLAS_URL: process.env.MONGOLOCAL_ATLAS,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE,
};
