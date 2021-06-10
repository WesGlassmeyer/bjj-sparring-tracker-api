const logEntryService = {
  getAllLogEntries(knex) {
    return knex
      .select("*")
      .from("log_entry")
      .join(
        "log_moves_pivot",
        "log_entry.id",
        "=",
        "log_moves_pivot.log_entry_id"
      )
      .join("moves", "moves.id", "=", "log_moves_pivot.move_id")
      .orderBy("date", "desc");
  },

  insertLogEntry(knex, newEntry, newMoves) {
    let completedLogEntry;
    return knex
      .insert(newEntry)
      .into("log_entry")
      .returning("*")
      .then((entry) => {
        return entry[0];
      })
      .then((newLogEntry) => {
        completedLogEntry = newLogEntry;
        const movesPromises = [];
        const categories = ["submissions", "taps", "sweeps"];
        categories.forEach((cat) => {
          newMoves[cat].forEach((move) => {
            movesPromises.push(
              knex
                .insert({
                  category: move.category,
                  name: move.name,
                  count: move.count,
                })
                .into("moves")
                .returning("*")
            );
          });
        });
        return Promise.all(movesPromises);
      })
      .then((newMoveEntry) => {
        const movesPromises2 = [];
        newMoveEntry.forEach((moveEntry) => {
          moveEntry.forEach((move) => {
            movesPromises2.push(
              knex
                .insert({
                  log_entry_id: completedLogEntry.id,
                  move_id: move.id,
                })
                .into("log_moves_pivot")
                .returning("*")
            );
          });
        });

        return Promise.all(movesPromises2);
      })
      .then(() => {
        return completedLogEntry.id;
      });
  },

  getById(knex, id) {
    return knex
      .select("*")
      .from("log_entry")
      .where("log_entry.id", id)
      .join(
        "log_moves_pivot",
        "log_entry.id",
        "=",
        "log_moves_pivot.log_entry_id"
      )
      .join("moves", "moves.id", "=", "log_moves_pivot.move_id");
  },

  updateEntry(knex, logEntryId, entryToUpdate, movesToUpdate) {
    let completedLogEntry;
    return knex
      .from("log_moves_pivot")
      .select("move_id")
      .where("log_entry_id", logEntryId)
      .then((moveIdArr) => {
        moveIdArr.forEach((moveId) => {
          knex.from("moves").where("id", moveId.move_id).del().then();
        });
        knex.from("log_moves_pivot").where("log_entry_id", logEntryId).del();
        return knex.from("log_entry").where("id", logEntryId).del();
      })
      .then(() => {
        return knex
          .insert(entryToUpdate)
          .into("log_entry")
          .returning("*")
          .then((entry) => {
            return entry[0];
          });
      })
      .then((newLogEntry) => {
        completedLogEntry = newLogEntry;
        const movesPromises = [];
        const categories = ["submissions", "taps", "sweeps"];
        categories.forEach((cat) => {
          movesToUpdate[cat].forEach((move) => {
            movesPromises.push(
              knex
                .insert({
                  category: move.category,
                  name: move.name,
                  count: move.count,
                })
                .into("moves")
                .returning("*")
            );
          });
        });
        return Promise.all(movesPromises);
      })
      .then((newMoveEntry) => {
        const movesPromises2 = [];
        newMoveEntry.forEach((moveEntry) => {
          moveEntry.forEach((move) => {
            movesPromises2.push(
              knex
                .insert({
                  log_entry_id: completedLogEntry.id,
                  move_id: move.id,
                })
                .into("log_moves_pivot")
                .returning("*")
            );
          });
        });

        return Promise.all(movesPromises2);
      })
      .then(() => {
        return completedLogEntry.id;
      });
  },
};

module.exports = logEntryService;
