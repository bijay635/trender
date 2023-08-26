const {
  getFeedPosts,
  getUserPosts,
  likePost,
  commentPost
} = require("../controllers/postController");
const { verifyUser } = require("../middleware/auth");

const router = require("express").Router();

/* READ */
router.get("/", verifyUser, getFeedPosts);
router.get("/:userId/posts", verifyUser, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyUser, likePost);
router.patch("/:id/comment", verifyUser, commentPost);

module.exports = router;