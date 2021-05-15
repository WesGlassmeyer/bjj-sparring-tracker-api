module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  API_BASE_URL:
    process.env.REACT_APP_API_BASE_URL ||
    "postgresql://wes@localhost/bjj-sparring-tracker",
};
