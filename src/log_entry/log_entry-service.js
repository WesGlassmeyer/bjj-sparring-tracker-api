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
      .join("moves", "moves.id", "=", "log_moves_pivot.move_id");
  },

  //     insertItem(knex, newItem, newRating, newTags) {
  //       let favItem;
  //       return knex
  //         .select("*")
  //         .from("fav_items")
  //         .where("youtube_id", newItem.youtube_id)
  //         .then((favVideo) => {
  //           if (favVideo.length === 0) {
  //             return knex.insert(newItem).into("fav_items").returning("*");
  //           } else {
  //             return favVideo;
  //           }
  //         })
  //         .then((newFavItem) => {
  //           favItem = newFavItem[0];
  //           return knex
  //             .insert({ fav_items_id: newFavItem[0].id, value: newRating.rating })
  //             .into("ratings")
  //             .returning("*");
  //         })
  //         .then((newRatingRows) => {
  //           return knex.select("id").from("tags").whereIn("name", newTags);
  //         })
  //         .then((parsedTags) => {
  //           for (i = 0; i < parsedTags.length; i++) {
  //             knex
  //               .insert({ tag_id: parsedTags[i].id, fav_items_id: favItem.id })
  //               .into("fav_items_tags_pivot")
  //               .then();
  //           }
  //           return favItem;
  //         });
  //     },
  //     getById(knex, id) {
  //       return knex.from("fav_items").select("*").where("youtube_id", id).first();
  //     },
};

module.exports = logEntryService;
