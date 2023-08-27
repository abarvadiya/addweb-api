const { signIn, signUp, createTokens } = require("../services/user.service");

exports.signin = async (req, res) => {
  try {
    const result = await signIn(req.body);
    return res.status(200).send({
      status: 200,
      data: result,
      message: "Signin successfully",
    });
  } catch (err) {
    return res.status(err.status || 500).send({
      status: err.status,
      message: err.message || "Internal server error",
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const result = await signUp(req.body);
    return res.status(201).send({
      status: 201,
      data: result,
      message: "Signup successfully",
    });
  } catch (err) {
    return res.status(err.status || 500).send({
      status: err.status,
      message: err.message || "Internal server error",
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const result = await createTokens(req.body.oldRefreshToken);
    return res.status(200).send({
      status: 200,
      data: result,
      message: "Token generated successfully",
    });
  } catch (err) {
    return res.status(err.status || 500).send({
      status: err.status,
      message: err.message || "Internal server error",
    });
  }
};
