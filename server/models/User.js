const mongoose = require("mongoose");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an email"],
  },
  hash: String,
  salt: String,
  image: String,
  bio: String,
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  },
  auth: {
    type: String,
    enum: ["CREDENTIALS", "GOOGLE"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  token: String,
  tokenExpiry: Date,
}, {timestamps: true});

// UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

const UserModel = new mongoose.model("User", UserSchema);
module.exports = UserModel;