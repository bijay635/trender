const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

/**
 * 
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 * @returns boolean whether hash matches or not
 */
module.exports.validPassword = (password, hash, salt) => {
  let hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

/**
 * 
 * @param {*} password - The password string that the user inputs in the register form
 * @returns {salt, hash} - Object having two fields: salt, hash
 */
module.exports.genPassword = (password) => {
  let salt = crypto.randomBytes(32).toString("hex");
  let genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  
  return {
    salt: salt,
    hash: genHash,
  };
}

/**
 * 
 * @param {*} user - The user object. Needed to set the JWT `sub` payload property
 * @returns {token, expires}
 */
module.exports.issueJWT = (user) => {
  const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
  const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

  const _id = user._id;
  const expiresIn = "1d";
  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}