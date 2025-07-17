const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Session exists but no user data" });
    }
    return next();
  }
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    console.log(decoded)
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};