const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${label} [${level}]: ${message}`;
});

const productionLogger = () => {
  return createLogger({
    level: "warn",
    format: combine(label({ label: "prod" }), timestamp(), myFormat),
    transports: [
      new transports.File({ filename: "error.log", level: "error" }),
      new transports.File({ filename: "combined.log" }),
      new transports.Console(),
    ],
  });
};

module.exports = productionLogger;
