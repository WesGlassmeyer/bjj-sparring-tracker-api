const knex = require("knex");
const app = require("./app");
const { PORT, API_BASE_URL } = require("./config");
console.log(API_BASE_URL, "555555555");
const db = knex({
  client: "pg",
  connection: API_BASE_URL,
});

console.log(db);
app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
