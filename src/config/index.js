// Add all your app's config here along with envs

const config = {
  AXIOS_TIMEOUT: 60 * 1000,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_URL: process.env.DB_URL,
};

module.exports = config;
