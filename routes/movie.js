const express = require("express");
const router = express.Router();
const {
  getAllFavouriteMovies,
  addWatchLaterMovie,
  getAllWatchLaterMovies,
  addFavouriteMovie,
  deleteFromFavourite,
  deleteFromWatchLater,
} = require("../controllers/movieController");
router.route("/favourite").get(getAllFavouriteMovies).post(addFavouriteMovie);
router
  .route("/watchlater")
  .get(getAllWatchLaterMovies)
  .post(addWatchLaterMovie);

router.delete("/watchlater/:id", deleteFromWatchLater);
router.delete("/favourite/:id", deleteFromFavourite);

module.exports = router;
