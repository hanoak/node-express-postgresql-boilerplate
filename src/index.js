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

  //For unmatched route patterns
  app.use(unmatchedRoutesMiddleware);

  //Global error handler middleware
  app.use(errorMiddleware);

  app.listen(PORT, () => {
    console.info(`Serve started at port: ${PORT}`);
  });
} catch (e) {
  console.error(constants.LOGS.APP_ERROR);
  console.error(e);
}
