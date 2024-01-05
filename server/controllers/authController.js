const User = require("../models/User");
const passport = require("passport");
const { validPassword, genPassword, issueJWT } = require("../lib/utils");
const { token } = require("morgan");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const jwtSecret = process.env.JWT_SECRET;

module.exports.test = (req, res) => {
  res.json("trender test ok");
};

module.exports.profile = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({status: true, user: req.user._id, username: req.user.username});
  } else {
    res.status(401).json({status: false});
  }
};

module.exports.protected = (req, res) => {
  res.status(200).json({
    success: true,
    message: "You are successfully authenticated to this route",
  })
}

// module.exports.register = (req, res) => {
//   const {name, username, email, password} = req.body;
//   User.register(new User({username: username, name: name, email: email}), password, (err) => {
//     if (err) {
//       console.log(err.message);
//       return res.status(500).json({status: false, message: err.message});
//     } else {
//       passport.authenticate("local")(req, res, () => {
//         console.log("user registered");
//         res.json({status: true, user: req.user._id, username: req.user.username});
//       });
//     }
//   });
// };

module.exports.register = async (req, res) => {
  const { name, username, email, password } = req.body;

  const user = await User.findOne({email});

  if (user) {
    console.log("User already exists!");
    return res.status(400).json({ success: false, message: "User already exists" });
  }

  const { salt, hash } = genPassword(password);
  const newUser = new User({
    name,
    username,
    email,
    hash,
    salt,
    auth: "CREDENTIALS"
  });

  try {
    newUser.save().then((user) => {
      res.json({ success: true, user: user });
    });
  } catch (err) {
    res.json({ success: false, message: err });
  }
}

// module.exports.login = async (req, res) => {

//   passport.authenticate("local", (err, user) => {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     if (!user) {
//       return res.status(401).json({ status: false, message: "Authentication failed. Invalid username/password." });
//     }

//     req.login(user, (err) => {
//       if (err) {
//         return res.status(500).json(err);
//       }
//       console.log("user logged in");
//       res.json({ status: true, user: req.user._id, username: req.user.username });
//     });
//   })(req, res);
// };

module.exports.login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({username})
    .then((user) => {
      if (!user) {
        return res.status(401).json({ success: false, message: "User not found" })
      }

      if (user.auth === "GOOGLE") {
        return res.status(401).json({ success: false, message: "Login using Google"});
      }
  
      // check if user email is verified
      // if (!user.isVerified) {
      //   return res.status(401).json({ success: false, message: "Verify your email"});
      // }

      const isValid = validPassword(
        password,
        user.hash,
        user.salt
      );

      if (isValid) {
        const tokenObject = issueJWT(user);

        const userResponse = (({_id, name, username, email, role, image, bio}) => ({_id, name, username, email, role, image, bio}))(user);

        res.status(200).json({
          success: true,
          user: userResponse,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid password"
        })
      }
    })
}

// module.exports.google = (req, res) => {
//   passport.authenticate("google", { scope: ["profile", "email"] });
// }

// module.exports.googleCallback = (req, res) => {
//   passport.authenticate("google", {
//     successRedirect: process.env.CLIENT_URL,
//     failureRedirect: `${process.env.CLIENT_URL}/register`,
//   });
// }