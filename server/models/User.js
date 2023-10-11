const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String, //thisisnt working
  },
  lastName: {
    type: String, //this isnt working
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
  capsules: [
    {
      type: Schema.Types.ObjectId,
      ref: "Capsule",
    },
  ],
},
{
  toJSON: {
    virtuals: true,
  },
}
);
userSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
