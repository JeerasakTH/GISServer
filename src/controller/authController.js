const { JWT_SECRET } = require("../constants");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;

  if (!cookies) {
    return res.status(404).json({
      status: "failed",
      message: "Token not found",
      payload: [],
    });
  }

  const token = cookies.split("=")[1];
  const test = token.split(";")[0];

  jwt.verify(String(test), JWT_SECRET, (err, user) => {
    if (err) {
      console.log(1);
      return res.status(400).json({
        status: "fail",
        message: "Invalid token",
      });
    }
    req.id = user.user_id;
  });

  next();
};
