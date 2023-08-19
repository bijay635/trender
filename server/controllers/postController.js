const Post = require("../models/Post");

/* CREATE POST */
module.exports.createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;
    let picturePath = null;
    if (req.file) {
      // req.file.path gives the path from root directory
      // i.e. public/assets/file_name
      // slice(14) takes only the file_name
      picturePath = req.file.path.slice(14);
    }
    // console.log(picturePath);
    const newPost = await Post.create({
      userId,
      description,
      picturePath,
      likes: {},
      comments: [],
    });

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ POSTS */
module.exports.getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE POST */
module.exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {likes: post.likes}
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports.commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;
    const post = await Post.findById(id);
    post.comments.push({ userId, comment });

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {comments: post.comments}
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};