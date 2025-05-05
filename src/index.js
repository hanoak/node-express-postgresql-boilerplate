require("dotenv").config();
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
const config = require("./config");
const constants = require("./constants");

const requestHeadersMiddleware = require("./middlewares/req-header.middleware");
const unmatchedRoutesMiddleware = require("./middlewares/unmatched-routes.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const { sequelize } = require("./database/models");

const userRoutes = require("./routes/users.routes");
const postRoutes = require("./routes/posts.routes");

try {
  const PORT = config.PORT || 5000;
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: "*" }));
  app.use(express.json());

  app.use(requestHeadersMiddleware);

  app.get("/", (req, res) => {
    res.status(200).send({ msg: "Hello, world!" });
  });

  //Add your app's routes here
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/posts", postRoutes);

  //For unmatched route patterns
  app.use(unmatchedRoutesMiddleware);

  //Global error handler middleware
  app.use(errorMiddleware);

  app.listen(PORT, async () => {
    console.info(`Serve started at port: ${PORT}`);

    await sequelize.authenticate();
    console.log(constants.LOGS.DB_CONNECTED);
  });
} catch (e) {
  console.error(constants.LOGS.APP_ERROR);
  console.error(e);
}
