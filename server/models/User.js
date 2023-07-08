const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = mongoose.Schema({
  name: String,
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  password: String,
  googleId: String
}, {timestamps: true});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

const UserModel = new mongoose.model("User", UserSchema);
module.exports = UserModel;