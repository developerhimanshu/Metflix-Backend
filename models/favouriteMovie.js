const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  addedBy: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
});
module.exports = mongoose.model("FavouriteMovie", MovieSchema);
