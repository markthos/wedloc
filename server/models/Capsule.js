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
    required: true,
  },
  location: {
    type: String,
  },
  eventPic: {
    type: String,
    default: "https://res.cloudinary.com/dp0h5vpsz/image/upload/v1697055967/wedloc/test/n4nxmtrfe3forwcjsyzr.png",
  },
  posts: [postSchema],
  chat: [liveChatSchema],
  attendants: [attendeesSchema],
},  {
  toJSON: {
    virtuals: true,
  },
});

capsuleSchema.virtual('posts_count').get(function () {
  return this.posts.length;
});

capsuleSchema.virtual('chat_count').get(function () {
  return this.chat.length;
});

capsuleSchema.virtual('attendant_count').get(function () {
  return this.attendants.length;
});

const Capsule = model("Capsule", capsuleSchema);

module.exports = Capsule;
