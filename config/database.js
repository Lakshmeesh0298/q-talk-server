const { connect } = require("mongoose");
const { NODE_ENV, MONGOLOCAL_URL, MONGOATLAS_URL } = require("./index");

exports.connectDataBase = () => {
  if (NODE_ENV === "production") {
    connect(MONGOATLAS_URL);
    console.log("mongo ATLAS connected");
  } else {
    connect(MONGOLOCAL_URL);
    console.log("mongo LOCAL connected");
  }
};
