const {
  test,
  profile,
  protected,
  register,
  login,
  // google,
  // googleCallback
} = require("../controllers/authController");
const passport = require("passport");

const router = require("express").Router();

router.get("/test", test);
router.get("/profile", profile);
router.get("/protected", passport.authenticate("jwt", { session: false }), protected);
router.post("/register", register);
router.post("/login", login);
// router.get("/google", google);
// router.get("/google/callback", googleCallback);

module.exports = router;