const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  availableCopies: {
    type: Number,
    required: true,
    min: 0,
  },
  totalCopies: {
    type: Number,
    required: true,
    min: 1,
  },
});

const bookModel = mongoose.model("Book", bookSchema);

module.exports = bookModel;
