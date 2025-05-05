const config = require("../../config");

const pool = {
  max: 5, // Maximum number of connections in the pool
  min: 0, // Minimum number of connections in the pool
  acquire: 30000, // Maximum time, in milliseconds, that a connection can be acquired
  idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being released
};

// configuration for the database connection based on the environment (development, test, production)
module.exports = {
  development: {
    use_env_variable: config.DB_URL,
    dialect: "postgres",
    pool,
  },
  test: {
    use_env_variable: config.DB_URL,
    dialect: "postgres",
    pool,
  },
  production: {
    use_env_variable: config.DB_URL,
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
