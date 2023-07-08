const {
  test,
  profile,
  register,
  login,
  google,
  googleCallback
} = require("../controllers/userController");

const router = require("express").Router();

router.get("/test", test);
router.get("/profile", profile);
router.post("/register", register);
router.post("/login", login);
router.get("/google", google);
router.get("/google/callback", googleCallback);

module.exports = router;