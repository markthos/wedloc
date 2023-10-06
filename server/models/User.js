const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        // required: true // false could make it easier for guests to interact with the site
        // unique: true,
        // COMMENTED OUT FOR EASY TESTING. UNCOMMENT FOR PRODUCTION
        // match: [/.+@.+\..+/, 'Must use a valid email address'], 
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });


userSchema.methods.isCorrectPassword = async function (password) {
return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;