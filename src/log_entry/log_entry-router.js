const path = require("path");
const express = require("express");
const xss = require("xss");
const logEntryService = require("./log_entry-service");

const logEntryRouter = express.Router();
const jsonParser = express.json();

const serializeLogEntry = (entry) => ({
  id: entry.log_entry_id,
  user_id: entry.user_id,
  date: entry.date,
  rounds: entry.rounds,
  round_length: entry.rounds,
  cardio: entry.cardio,
  notes: xss(entry.notes),
  submissions: entry.submissions,
  taps: entry.taps,
  sweeps: entry.sweeps,
});

logEntryRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    logEntryService
      .getAllLogEntries(knexInstance)
      .then((entries) => {
        const newEntries = [];

        entries.forEach((entry) => {
          let index = newEntries.findIndex((id) => {
            return id.log_entry_id === entry.log_entry_id;
          });
          if (index === -1) {
            newEntries.push({
              ...entry,
              submissions: [],
              taps: [],
              sweeps: [],
            });
            index = newEntries.length - 1;
          }
          if (entry.category === "subs") {
            newEntries[index].submissions.push({
              name: entry.name,
              count: entry.count,
            });
          } else if (entry.category === "taps") {
            newEntries[index].taps.push({
              name: entry.name,
              count: entry.count,
            });
          } else {
            newEntries[index].sweeps.push({
              name: entry.name,
              count: entry.count,
            });
          }
        });
        res.json(newEntries.map(serializeLogEntry));
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { user_id, date, rounds, round_length, cardio, notes } = req.body;
    const newEntry = { user_id, date, rounds, round_length, cardio, notes };
    const { submissions, taps, sweeps } = req.body;
    const newMoves = { submissions, taps, sweeps };

    return logEntryService
      .insertLogEntry(req.app.get("db"), newEntry, newMoves)
      .then((entry) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${entry.id}`))
          .json(serializeLogEntry(entry));
      })
      .catch(next);
  });

logEntryRouter
  .route("/:logEntryId")
  .all((req, res, next) => {
    logEntryService
      .getById(req.app.get("db"), req.params.logEntryId)
      .then((entry) => {
        if (!entry) {
          return res
            .status(404)
            .json({ error: { message: `Entry does not exist` } });
        }
        res.entry = entry;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeLogEntry(res.entry));
  })
  .put(jsonParser, (req, res, next) => {
    const { user_id, date, rounds, round_length, cardio, notes } = req.body;
    const entryToUpdate = {
      user_id,
      date,
      rounds,
      round_length,
      cardio,
      notes,
    };
    const { submissions, taps, sweeps } = req.body;
    const movesToUpdate = { submissions, taps, sweeps };

    if (Object.values(entryToUpdate).filter(Boolean).length === 0) {
      return res.status(400).json({
        error: {
          message: `Request must contain "date", "rounds", "round_length", "cardio", "notes", "submissions", "taps" or "sweeps".`,
        },
      });
    }

    logEntryService
      .updateEntry(
        req.app.get("db"),
        req.params.logEntryId,
        entryToUpdate,
        movesToUpdate
      )
      .then((updatedEntry) => {
        res.status(200).end();
      })
      // .then((updatedEntry) => {
      //   console.log(updatedEntry, "111111111");
      //   res.status(200).json(serializeLogEntry(updatedEntry[0]));
      // })
      .catch(next);
  });

module.exports = logEntryRouter;

//  getbyid should work similarly to getall, using similar joins and logic in the router.
