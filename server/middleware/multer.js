// multer is a middleware used to handle multipart/form-data
// primarily for uploading files.
const multer = require("multer");

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    // const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// middleware for uploading a single image
const multerUpload = multer({ storage }).single("picture");

module.exports = multerUpload;