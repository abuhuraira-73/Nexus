const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Read Authorization header
  const authHeader = req.header("Authorization");

  // Missing header?
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Must be in "Bearer <token>" format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Token format is invalid" });
  }

  // Extract token
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = decoded.user;

    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
