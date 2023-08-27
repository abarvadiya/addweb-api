const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils");
const Token = require("../models/token.model");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw errorHandler("Access token not provided", 401);
    }

    const dbtoken = await Token.findOne({
      accessToken: token,
    });
    if (!dbtoken) {
      throw errorHandler("Unauthorized", 401);
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).send({
      status: 401,
      message: err.message || "Unauthorized",
    });
  }
};
