const { Schema } = require('mongoose');

const attendeesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = attendeesSchema;
