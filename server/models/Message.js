const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    // added other necessary fields -am
    date : {
        type: Date,
        required: true,
        default: Date.now,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: 'Anonymous Guest'
    },
    post : {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
});


const Message = model('Message', messageSchema);

module.exports = Message;