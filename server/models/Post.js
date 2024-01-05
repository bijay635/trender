const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  userId: {type: String, required: true},
  username: {type: String, required: true},
  description: String,
  picturePath: String,
  likes: {
    type: Map,
    of: Boolean,
  },
}, {timestamps: true});

const PostModel = new mongoose.model("Post", PostSchema);
module.exports = PostModel;