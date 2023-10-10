const { Schema } = require('mongoose');

const livechatSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    date : {
        type: Date,
        required: true,
        default: Date.now,
    },
    author: {
        type: String,
        required: true,
        default: 'Anonymous Guest'
    },
});

module.exports = livechatSchema;