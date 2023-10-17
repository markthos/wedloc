const { Schema } = require("mongoose");

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    default: "Anonymous Guest",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = commentSchema;
