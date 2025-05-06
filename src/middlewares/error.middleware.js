const { AppError } = require("../errors/custom-errors.utils");
const { HTTP_TEXTS } = require("../constants");
const logger = require("../logger");

const errorMiddleware = (
  err,
  req,
  res,
  // eslint-disable-next-line no-unused-vars
  next,
) => {
  if (err instanceof AppError) {
    res
      .status(err.statusCode)
      .json({ error: { code: err.statusCode, message: err.message } });
  } else {
    // Log the error
    logger.error(err.stack);
    res
      .status(500)
      .json({ error: { code: 500, message: HTTP_TEXTS.INTERNAL_ERROR } });
  }
};

module.exports = errorMiddleware;
