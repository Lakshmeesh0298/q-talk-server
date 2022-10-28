const express = require("express");
const cors = require("cors");
//internal import
const { PORT } = require("./config");
const { connectDataBase } = require("./config/dataBase");
const batchRouter = require("./router/batchesRoute");
const chatrouter = require("./router/chatRoutes");
const authrouter = require("./router/authRoute");

let app = express();
let startServer = () => {
  try {
    // internal middlewares
    connectDataBase();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());

    app.get("/", (req, res) => {
      res.send("ok");
    });
    app.use("/batch", batchRouter);
    app.use("/chat", chatrouter);
    app.use("/auth", authrouter);

    app.listen(PORT, err => {
      if (err) throw err;
      console.log(`server is running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
