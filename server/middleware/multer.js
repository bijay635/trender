// multer is a middleware used to handle multipart/form-data
// primarily for uploading files.
const multer = require("multer");
const DatauriParser = require("datauri/parser");
const path = require("path");

// FILE STORAGE (store image in disk)

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets");
//   },
//   filename: function (req, file, cb) {
//     // const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1E9);
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// store file in memory first before uploading to cloud storage
const storage = multer.memoryStorage();

// middleware for uploading a single image
const multerUpload = multer({ storage }).single("picture");

const dUriParser = new DatauriParser();

/**
 * @description: This function converts the buffer to data url
 * @param: {Object} req containing the field object
 * @returns: {String} The data url from the string buffer
*/

const dataUri = req =>
  dUriParser.format(path.extname(req.file.originalname).toString(),
              req.file.buffer);


module.exports = { multerUpload, dataUri };