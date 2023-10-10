const { Schema, model } = require('mongoose');
const postSchema = require('./Post');
const livechatSchema = require('./LiveChat');

const capsuleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date : {
        type: Date,
        required: true,
        default: Date.now,
    },
    location : {
        type: String,
    },
    posts : [
        postSchema,
    ],
    chat: [
        livechatSchema,
    ],
    owner : {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Capsule = model('Capsule', capsuleSchema);

module.exports = Capsule;
