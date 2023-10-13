const { Schema } = require("mongoose");
const commentSchema = require("./Comment");

const postSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    upVotes: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
    owner: {
      type: String,
      required: true,
      default: "Anonymous Guest",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

postSchema.virtual("comment_count").get(function () {
  return this.comments.length;
});

module.exports = postSchema;
