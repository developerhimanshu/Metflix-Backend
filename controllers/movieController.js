const FavouriteMovie = require("../models/favouriteMovie");
const WatchLaterMovie = require("../models/watchLaterMovie");
const getAllFavouriteMovies = async (req, res) => {
  const movies = await FavouriteMovie.find({ addedBy: req.user.userId });
  res.status(200).json({ movies, count: movies.length });
};
const addFavouriteMovie = async (req, res) => {
  req.body.addedBy = req.user.userId;
  const mvie = await FavouriteMovie.create(req.body);
  res.status(201).json({ mvie });
};
const deleteFromFavourite = async (req, res) => {
  const {
    user: { userId },
    params: { id: movieId },
  } = req;
  const movie = await FavouriteMovie.findOneAndRemove({
    movieId: movieId,
    addedBy: userId,
  });
  if (!movie) {
    return res.status(404).json({ msg: "Movie not found with id" + movieId });
  }
  res.status(200).send("Deleted");
};

const getAllWatchLaterMovies = async (req, res) => {
  const movies = await WatchLaterMovie.find({ addedBy: req.user.userId });
  res.status(200).json({ movies, count: movies.length });
};
const addWatchLaterMovie = async (req, res) => {
  req.body.addedBy = req.user.userId;
  const mvie = await WatchLaterMovie.create(req.body);
  res.status(201).json({ mvie });
};
const deleteFromWatchLater = async (req, res) => {
  const {
    user: { userId },
    params: { id: movieId },
  } = req;
  const movie = await WatchLaterMovie.findOneAndRemove({
    movieId: movieId,
    addedBy: userId,
  });
  if (!movie) {
    return res.status(404).json({ msg: "Movie not found with id" + movieId });
  }
  res.status(200).send("Deleted");
};

module.exports = {
  getAllFavouriteMovies,
  addFavouriteMovie,
  getAllWatchLaterMovies,
  addWatchLaterMovie,
  deleteFromFavourite,
  deleteFromWatchLater,
};
