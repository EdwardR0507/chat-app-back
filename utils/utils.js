const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const generateJWT = async (payload, key, expiration) => {
  return jwt.sign(payload, key, {
    expiresIn: expiration,
    algorithm: "HS256",
  });
};

const checkJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_KEY);
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};

const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  encryptPassword,
  generateJWT,
  comparePassword,
  checkJWT,
};
