const {
  getFeedPosts,
  getUserPosts,
  // likePost,
  // commentPost
} = require("../controllers/postController");
// const { verifyUser } = require("../middleware/auth");
const passport = require("passport");

const router = require("express").Router();

/* READ */
router.get("/", passport.authenticate('jwt', { session: false }), getFeedPosts);
router.get("/:userId/posts", passport.authenticate('jwt', { session: false }), getUserPosts);

/* UPDATE */
// router.patch("/:id/like", verifyUser, likePost);
// router.patch("/:id/comment", verifyUser, commentPost);

module.exports = router;