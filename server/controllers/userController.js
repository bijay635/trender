const User = require("../models/User");
const passport = require("passport");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const jwtSecret = process.env.JWT_SECRET;

module.exports.test = (req, res) => {
  res.json("trender test ok");
};

module.exports.profile = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({status: true});
  } else {
    res.status(401).json({status: false});
  }
};

module.exports.register = (req, res) => {
  const {name, username, email, password} = req.body;
  User.register(new User({username: username, name: name, email: email}), password, (err) => {
    if (err) {
      return res.status(500).json("error");
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log("user registered");
        res.json({status: true});
      });
    }
  });
};

module.exports.login = async (req, res) => {

  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!user) {
      return res.status(401).json({ status: false, message: "Authentication failed. Invalid username/password." });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log("user logged in");
      res.json({ status: true });
    });
  })(req, res);
};

module.exports.google = (req, res) => {
  passport.authenticate("google", { scope: ["profile", "email"] });
}

module.exports.googleCallback = (req, res) => {
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.CLIENT_URL}/register`,
  });
}