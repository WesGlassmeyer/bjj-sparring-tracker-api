const knex = require("knex");
const fixtures = require("./log_entry-fixtures");
const app = require("../src/app");
const supertest = require("supertest");

describe("Log Entry Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db.raw(
      "TRUNCATE log_moves_pivot, moves, log_entry, users RESTART IDENTITY CASCADE"
    )
  );

  afterEach("clean the table", () =>
    db.raw(
      "TRUNCATE log_moves_pivot, moves, log_entry, users RESTART IDENTITY CASCADE"
    )
  );

  describe("GET /log_entry", () => {
    const testUsers = fixtures.makeUsersArray();
    const testLogEntries = fixtures.makeLogEntriesArray();
    const testMoves = fixtures.makeMovesArray();
    const testMovesPivot = fixtures.makeMovesPivotArray();
    const testExpectedLogEntries = fixtures.makeExpectedLogEntriesArray();

    beforeEach("insert log_entry", () => {
      return db
        .into("users")
        .insert(testUsers)
        .then(() => {
          return db.into("log_entry").insert(testLogEntries);
        })
        .then(() => {
          return db.into("moves").insert(testMoves);
        })
        .then(() => {
          return db.into("log_moves_pivot").insert(testMovesPivot);
        });
    });
    it("gets log_entry from the database", () => {
      return supertest(app)
        .get("/log_entry")
        .expect(200, testExpectedLogEntries);
    });
  });
  //   describe("GET /fav_items", () => {
  //     const testFavItems = fixtures.makeFavItemsArray();
  //     const testRatings = fixtures.makeRatingsArray();
  //     const testTags = fixtures.makeTagsArray();
  //     const testTagsPivot = fixtures.makeFavItemsTagsPivot();
  //     const testExpectedFavItems = fixtures.makeExpectedFavItemsArray();
  //     beforeEach("insert fav_items", () => {
  //       return db
  //         .into("fav_items")
  //         .insert(testFavItems)
  //         .then(() => {
  //           return db.into("ratings").insert(testRatings);
  //         })
  //         .then(() => {
  //           return db.into("tags").insert(testTags);
  //         })
  //         .then(() => {
  //           return db.into("fav_items_tags_pivot").insert(testTagsPivot);
  //         });
  //     });
  //     it("gets the fav_items from the database", () => {
  //       return (
  //         supertest(app)
  //           .get("/fav_items")
  //           //   .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
  //           .expect(200, testExpectedFavItems)
  //       );
  //     });
  //   });
});
