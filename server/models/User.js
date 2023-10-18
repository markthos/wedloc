const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // removes whitespace
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  profilePic: {
    type: String,
    default: "https://res.cloudinary.com/dp0h5vpsz/image/upload/v1696742137/wedloc/test/Matthew_Megan_-876_websize_ax5rlf.jpg",
  },
  creditCards: [{
    type: Schema.Types.ObjectId,
    ref: 'CreditCard',
    default: []
  }],
  capsules: [
    {
      type: Schema.Types.ObjectId,
      ref: "Capsule",
      default: [],
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

userSchema.virtual("capsules_count").get(function () {
  return this.capsules.length;
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
