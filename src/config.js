module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_ORIGIN || "http://localhost:3000",

  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://wes@localhost/bjj-sparring-tracker",

  LICENSE_KEY: process.env.LICENSE_KEY,
  NEW_RELIC_APP_NAME: process.env.NEW_RELIC_APP_NAME,
};
