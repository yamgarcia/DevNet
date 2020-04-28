const jwt = require("jsonwebtoken");
const config = require("config");

// Middleware function(req, res, next)
module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");

  //Check if there is a token
  if (!token) {
    return res.status(401).json({ msg: "Autorization denied. No token." });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecrete"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Autorization denied. Token not valid" });
  }
};
