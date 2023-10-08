const { Schema, model } = require('mongoose');

const capsuleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date : {
        type: Date,
        required: true,
    },
    posts : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        }
    ],
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

});

const Capsule = model('Capsule', capsuleSchema);

module.exports = Capsule;
