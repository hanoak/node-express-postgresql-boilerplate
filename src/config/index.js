require("dotenv").config();
// Add all your app's config here along with envs

const config = {
  AXIOS_TIMEOUT: 60 * 1000,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_URL: process.env.DB_URL,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
};

module.exports = config;
