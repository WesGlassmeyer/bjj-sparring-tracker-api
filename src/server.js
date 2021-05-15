const knex = require("knex");
const app = require("./app");
const { PORT, API_BASE_URL } = require("./config");

const db = knex({
  client: "pg",
  connection: API_BASE_URL,
});

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
