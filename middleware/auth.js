const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const user = jwt.decode(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
};

module.exports = auth;
