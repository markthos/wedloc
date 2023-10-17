const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://wedloc:BBTK5cXTd4xsSNVf@wedloc.t785pkl.mongodb.net/?retryWrites=true&w=majority');

module.exports = mongoose.connection;