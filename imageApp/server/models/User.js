const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  imageName: String,
  imageNumber: Number,
  image: String,
});

module.exports = mongoose.model("User", userSchema);