const express = require("express");
const { PORT } = require("./config");
const { connectDataBase } = require("./config/dataBase");
const batchRouter = require("./router/batchesRoute");
const chatrouter = require("./router/chatRoutes");
const authrouter = require("./router/authRoute");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./api.yaml");
const cors = require("cors");
let app = express();
let startServer = () => {
  try {
    connectDataBase();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(
      cors({
        origin: "http://localhost:3000",
      })
    );
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
