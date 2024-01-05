// Pronajit Dey (29/04/23)
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
// const User = require("./models/User");
// const { verifyUser } = require("./middleware/auth");
const { createPost } = require("./controllers/postController");
const { multerUpload } = require("./middleware/multer");
const { cloudinaryConfig } = require("./config/cloudinaryConfig");

dotenv.config();

require("./config/passport.config")(passport);

const app = express();
app.use(morgan("common"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
// app.use(passport.session());

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

// CONFIGURATION OF PASSPORT
// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser(async (id, done) => {
//   try {
//     return done(null, await User.findById(id));
//   } catch(error) {
//     return done(error);
//   } 
// });

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:4040/auth/google/callback",
//   userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo" // for google+ deprecation
// },
// function(accessToken, refreshToken, profile, cb) {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));

// Use Cloudinary Config
app.use("*", cloudinaryConfig);

// ROUTE WITH FILE
app.post("/posts", passport.authenticate('jwt', { session: false }), multerUpload, createPost);

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.listen(4040, () => {
  console.log("Server started on port 4040");
});
