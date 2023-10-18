const { cloudinaryUploader } = require("../config/cloudinaryConfig");
const { dataUri } = require("../middleware/multer");
const Post = require("../models/Post");


/* CREATE POST */
module.exports.createPost = async (req, res) => {
  const { userId, username, description } = req.body;
  let picturePath = null;
    
  // Initialize a promise for the Cloudinary upload operation
  const cloudinaryUploadPromise = req.file
    ? new Promise((resolve, reject) => {
      const file = dataUri(req).content;
      cloudinaryUploader.upload(file)
        .then((result) => {
          resolve(result.secure_url);
        })
        .catch((err) => reject(err));
      })
    : Promise.resolve(null);
      
  // uploaded file to cloudinary, wait to obtain picturePath
  try {
    picturePath = await cloudinaryUploadPromise;
  } catch (err) {
    console.error(err);
  }
      
  // Create a new post with the obtained picturePath
  try {
    // console.log(picturePath);
    const newPost = await Post.create({
      userId,
      username,
      description,
      picturePath,
      likes: {},
      comments: [],
    });

    // Fetch the updated list of posts, latest at the top
    const post = await Post.find().sort({"updatedAt": -1});
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


/* READ POSTS */
module.exports.getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({"updatedAt": -1});
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


module.exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).sort({"updatedAt": -1});
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