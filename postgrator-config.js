require("dotenv").config();

module.exports = {
  migrationsDirectory: "migrations",
  driver: "pg",
  //   ssl: true,
  connectionString:
    process.env.NODE_ENV === "test" ? TEST_DATABASE_URL : DATABASE_URL,
  // "postgresql://wes@localhost/bjj-sparring-tracker",
};
