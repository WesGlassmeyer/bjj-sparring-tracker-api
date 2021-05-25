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
  notes: entry.notes,
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
//   .post(jsonParser, (req, res, next) => {
//     const { title, youtube_id, thumbnail } = req.body;
//     const newItem = { title, youtube_id, thumbnail };
//     const { rating } = req.body;
//     const newRating = { rating };
//     const { tags } = req.body;
//     const newTags = tags;

//     for (const [key, value] of Object.entries(newItem, newRating))
//       if (value == null)
//         return res.status(400).json({
//           error: { message: `Missing '${key}' in request body` },
//         });
//     return FavItemsService.insertItem(
//       req.app.get("db"),
//       newItem,
//       newRating,
//       newTags
//     )
//       .then((item) => {
//         res
//           .status(201)
//           .location(path.posix.join(req.originalUrl, `/${item.youtube_id}`))
//           .json(serializeItem(item));
//       })
//       .catch(next);
//   });

// favItemsRouter
//   .route("/:itemid")
//   .all((req, res, next) => {
//     FavItemsService.getById(req.app.get("db"), req.params.itemid)
//       .then((item) => {
//         if (!item) {
//           return res.status(404).json({
//             error: { message: `Item doesn't exist` },
//           });
//         }
//         res.item = item;
//         next();
//       })
//       .catch(next);
//   })
//   .get((req, res, next) => {
//     res.json(serializeItem(res.item));
//   });

module.exports = logEntryRouter;

// soft delete moves table and pivot table
