const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('Authorization');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    // The token is expected to be in the format "Bearer <token>"
    const tokenString = token.split(' ')[1];
    if (!tokenString) {
        return res.status(401).json({ msg: 'Token format is invalid' });
    }

    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
