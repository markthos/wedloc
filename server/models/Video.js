const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Video', videoSchema);
