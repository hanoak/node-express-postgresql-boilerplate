const config = require("../../config");

const pool = {
  max: 7, // Maximum number of connections in the pool
  min: 2, // Minimum number of connections in the pool
  acquire: 20000, // Maximum time, in milliseconds, that a connection can be acquired
  idle: 20000, // Maximum time, in milliseconds, that a connection can be idle before being released
};

// configuration for the database connection based on the environment (development, test, production)
module.exports = {
  development: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: config.DB_HOST,
    dialect: "postgres",
    pool,
  },
  test: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: config.DB_HOST,
    dialect: "postgres",
    pool,
  },
  production: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: config.DB_HOST,
    dialect: "postgres",
    pool,
    dialectOptions: {
      ssl: {
        // enable this for production environment only if using a secure connection
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
