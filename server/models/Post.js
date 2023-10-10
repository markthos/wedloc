const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    date : {
        type: Date,
        required: true,
        default: Date.now,
    },
    // changed 'user' to 'owner' -am
    owner : {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    capsule : {
        type: Schema.Types.ObjectId,
        ref: 'Capsule',
    },
});

const Post = model('Post', postSchema);

module.exports = Post;
