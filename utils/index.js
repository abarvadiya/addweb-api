const jwt = require("jsonwebtoken");

const getToken = (userId, time) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: time,
  });

exports.generateTokens = userId => {
  const accessToken = getToken(userId, process.env.ACCESS_TOKEN_EXPIRE_TIME);
  const refreshToken = getToken(userId, process.env.REFRESH_TOKEN_EXPIRE_TIME);
  return { accessToken, refreshToken };
};

exports.errorHandler = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
