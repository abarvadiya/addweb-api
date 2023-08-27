const User = require("../models/user.model");
const Token = require("../models/token.model");
const jwt = require("jsonwebtoken");
const { generateTokens, errorHandler } = require("../utils/index");

exports.signIn = async ({ userNameOrEmail, password }) => {
  try {
    const user = await User.findOne({
      $or: [{ email: userNameOrEmail }, { userName: userNameOrEmail }],
    });

    if (!user) {
      throw errorHandler("User not found", 404);
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      throw errorHandler("Invalid password", 401);
    }

    const userId = user._id;

    await Token.deleteMany({ userId });

    const { accessToken, refreshToken } = generateTokens(userId);
    const expiredTime = new Date();
    expiredTime.setDate(expiredTime.getDate() + 1);

    const tokens = new Token({
      userId,
      accessToken,
      refreshToken,
      expiredTime,
    });
    await tokens.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

exports.signUp = async userDetails => {
  try {
    const existingUser = await User.findOne({
      $or: [{ email: userDetails.email }, { userName: userDetails.userName }],
    });
    if (existingUser) {
      throw errorHandler(
        "User with the same email or username already exists",
        400
      );
    }

    const newUser = new User(userDetails);
    await newUser.save();

    return {};
  } catch (error) {
    throw error;
  }
};

exports.createTokens = async oldRefreshToken => {
  try {
    const expiredTime = new Date();
    expiredTime.setDate(expiredTime.getDate() + 1);

    const { userId } = await jwt.verify(
      oldRefreshToken,
      process.env.JWT_SECRET
    );

    const { accessToken, refreshToken } = generateTokens(userId);

    const updatedTokens = await Token.findOneAndUpdate(
      { userId, refreshToken: oldRefreshToken },
      {
        accessToken,
        refreshToken,
        expiredTime,
      },
      { returnDocument: "after" }
    );

    if (!updatedTokens) {
      throw errorHandler("Token does not exist", 401);
    }

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};
