require("dotenv").config();

module.exports = {
  migrationsDirectory: "migrations",
  driver: "pg",
  //   ssl: true,
  connectionString: "postgresql://wes@localhost/bjj-sparring-tracker",
  //   connectionString: process.env.REACT_APP_API_BASE_URL,
};
