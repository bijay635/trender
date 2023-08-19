const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  userId: {type: String, required: true},
  description: String,
  picturePath: String,
  likes: {
    type: Map,
    of: Boolean,
  },
  comments: {
    type: Array,
    default: [],
  },
}, {timestamps: true});

const PostModel = new mongoose.model("Post", PostSchema);
module.exports = PostModel;