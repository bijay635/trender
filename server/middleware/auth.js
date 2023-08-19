const passport = require("passport");

module.exports.verifyUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(500).json({ status: false });
  }
}