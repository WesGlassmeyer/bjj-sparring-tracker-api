const knex = require("knex");
const fixtures = require("./log_entry-fixtures");
const app = require("../src/app");
const supertest = require("supertest");
const { expect } = require("chai");
const logEntryRouter = require("../src/log_entry/log_entry-router");

describe("Log Entry Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",

      connection: process.env.TEST_DATABASE_URL,

      // connection: "postgresql://wes@localhost/test-bjj-sparring-tracker",
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

  describe(`POST /log_entry`, () => {
    it(`creates a log_entry, responding with 201 and the new log_entry`, function () {
      const newLogEntry = {
        date: "2021-04-20",
        rounds: 5,
        round_length: 5,
        cardio: 1,
        notes: "hey dare",
        submissions: [
          {
            category: "subs",
            count: 2,
            name: "Triangle",
          },
        ],
        taps: [],
        sweeps: [],
      };
      return supertest(app)
        .post("/log_entry")
        .send(newLogEntry)
        .expect(201)
        .expect((res) => {
          expect(res.headers.location).to.exist;
        })
        .then((res) => {
          return supertest(app).get("/log_entry");
        })
        .then((res) => {
          expect(res.body.length).to.eql(1);
        });
    });
  });

  describe(`GET /log_entry/:logEntryId`, () => {
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
    it("responds with 200 and the specified log_entry", () => {
      const logEntryId = 2;
      const expectedLogEntry = testExpectedLogEntries[logEntryId - 1];
      return supertest(app)
        .get(`/log_entry/${logEntryId}`)
        .expect(200, expectedLogEntry);
    });
  });

  describe(`PUT /log_entry/:logEntryId`, () => {
    const testUsers = fixtures.makeUsersArray();
    const testLogEntries = fixtures.makeLogEntriesArray();
    const testMoves = fixtures.makeMovesArray();
    const testMovesPivot = fixtures.makeMovesPivotArray();

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
    it(`responds with 200 and replaces the log_entry`, () => {
      const logEntryId = 2;
      const updatedEntry = {
        user_id: 1,
        date: "2021-04-20",
        rounds: 5,
        round_length: 5,
        cardio: 1,
        notes: "hey dare",
        submissions: [
          {
            category: "subs",
            count: 2,
            name: "Triangle",
          },
        ],
        taps: [],
        sweeps: [],
      };
      return supertest(app)
        .put(`/log_entry/${logEntryId}`)
        .send(updatedEntry)
        .expect(200)
        .then((res) => {
          return supertest(app).get("/log_entry");
        })
        .then((res) => {
          expect(res.body).to.not.include({ id: logEntryId });
        });
    });
  });
});
