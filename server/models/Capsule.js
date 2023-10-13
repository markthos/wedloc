const { Schema, model } = require("mongoose");
const postSchema = require("./Post");
const liveChatSchema = require("./LiveChat");
const attendeesSchema = require("./Attendees");

const capsuleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  owner: {
    type: String,
    required: true
  },
  location: {
    type: String,
  },
  posts: [postSchema],
  chat: [liveChatSchema],
  attendants: [attendeesSchema],
});

const Capsule = model("Capsule", capsuleSchema);

module.exports = Capsule;
