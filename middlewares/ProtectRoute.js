const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { where } = require("sequelize");
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized - token not provided",
        jwwt: req.cookies.jwt,
      });
    }

    const decoded = jwt.verify(token, "mySecretKey");
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
module.exports = protectRoute;
