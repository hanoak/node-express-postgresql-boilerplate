const config = require("../config/index.js");
const devLogger = require("./dev.logger.js");
const productionLogger = require("./prod.logger.js");

const logger =
  config.NODE_ENV === "development" ? devLogger() : productionLogger();

module.exports = logger;
