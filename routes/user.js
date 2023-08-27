const express = require("express");
const router = express.Router({ mergeParams: true });
const createValidatorMiddleware = require("../middlewares/validator.middleware");
const {
  signin,
  signup,
  refreshToken,
} = require("../controllers/user.controller");
const { signInSchema, signUpSchema } = require("../utils/validationSchema");

const validateSignInData = createValidatorMiddleware(signInSchema);
const validateSignUpData = createValidatorMiddleware(signUpSchema);

router.post("/signin", validateSignInData, signin);
router.post("/signup", validateSignUpData, signup);
router.post("/refresh-token", refreshToken);

module.exports = router;
