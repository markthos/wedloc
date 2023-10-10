const { Schema } = require('mongoose');
const commentSchema = require('./Comment');

const postSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    date : {
        type: Date,
        required: true,
        default: Date.now,
    },
    upVotes : {
        type: Number,
        required: true,
        default: 0,
    },
    comments: [commentSchema],
    owner : {
        type: String,
        required: true,
        default: 'Anonymous Guest'
    },
});

module.exports = postSchema;
