const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Access denied, you need to login first",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
};
module.exports = { validateJWT };
